import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/user.schema';
import { Model } from 'mongoose';
import { SignupDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { fname, lname, email, password } = signupDto;
    const hashedPassword = await bcrypt(password, 10);
    const user = new this.userModel({
      fname,
      lname,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ userId: user._id });
    return { user, token };
  }

  async login(LoginDto) {}
}
