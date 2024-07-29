import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserSchema: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.UserSchema.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const product = await this.UserSchema.findById(id);

    return product;
  }

  async createOne(createUserDto): Promise<User> {
    const product = await new this.UserSchema(createUserDto);
    return product.save();
  }

  async updateOne(id: string, body): Promise<User> {
    const user = await this.UserSchema.findByIdAndUpdate(
      id,
      {
        fname: body.fname,
        lname: body.lname,
        phone: body.phone,
        email: body.email,
        image: body.image,
        role: body.role,
      },
      {
        new: true,
      },
    );
    return user;
  }

  async deleteOne(id: string): Promise<void> {
    await this.UserSchema.findByIdAndDelete(id);
  }
}
