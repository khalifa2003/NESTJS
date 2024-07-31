import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { SignupDto } from './dto/signup.dto';
import { User } from '../user/user.schema';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { EmailService } from 'src/utils/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private emailService: EmailService,
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect email or password');
    }
    const token = this.jwtService.sign(
      { userId: user._id },
      { secret: process.env.JWT_SECRET_KEY },
    );
    return { user, token };
  }

  async signup(signupDto: SignupDto) {
    const { fname, lname, email, password, phone } = signupDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new this.userModel({
      fname,
      lname,
      email,
      phone,
      password: hashedPassword,
    }).save();

    const token = this.jwtService.sign(
      { userId: user._id },
      { secret: process.env.JWT_SECRET_KEY },
    );
    return { user, token };
  }

  async forgetPassword(forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(`There is no user with that email ${email}`);
    }

    const resetCode = crypto.randomBytes(32).toString('hex');

    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    user.passwordResetCode = hashedResetCode;
    user.passwordResetExpires = Date.now();
    user.passwordResetVerified = false;

    await user.save();

    const message = `Hi ${user.fname},\n We received a request to reset the password on your Account. \n ${resetCode} \n Enter this code to complete the reset. \n Thanks for helping us keep your account secure.\n The Programming Area Team`;
    await this.emailService.sendEmail({
      email: user.email,
      subject: 'Your password reset code (valid for 10 min)',
      message,
    });

    return { status: 'Success', message: 'Reset code sent to email' };
  }

  async verifyResetCode(resetCode: string) {
    const hashedResetCode = crypto
      .createHash('sha256')
      .update(resetCode)
      .digest('hex');

    const user = await this.userModel.findOne({
      passwordResetCode: hashedResetCode,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      throw new BadRequestException('Reset code invalid or expired');
    }

    user.passwordResetVerified = true;
    await user.save();

    return { status: 'Success' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, resetCode, newPassword } = resetPasswordDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException(`There is no user with email ${email}`);
    }

    if (!user.passwordResetVerified) {
      throw new BadRequestException('Reset code not verified');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();

    const token = this.jwtService.sign({ userId: user._id });
    return { token };
  }
}
