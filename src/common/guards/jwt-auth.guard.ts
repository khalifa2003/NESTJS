import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/modules/user/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('You are not logged in');
    }
    const token = authorization.split(' ')[1];

    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });

    const user = await this.userModel.findById(decoded.userId);
    if (!user) {
      throw new UnauthorizedException(
        'The user belonging to this token no longer exists',
      );
    }

    if (user.passwordChangedAt) {
      const tokenExpired = user.passwordChangedAt.getTime() > Date.now();
      if (tokenExpired > decoded.iat) {
        throw new UnauthorizedException(
          'User recently changed password, please login again',
        );
      }
    }

    request.user = user;
    return true;
  }
}
