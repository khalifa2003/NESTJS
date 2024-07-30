import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address } from './address.schema';
import { User } from '../user.schema';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async addAddress(userId: string, address: Address) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { addresses: address } },
      { new: true },
    );
  }

  async removeAddress(userId: string, addressId: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { addresses: { _id: addressId } } },
      { new: true },
    );
  }

  async getLoggedUserAddresses(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    return user?.addresses || [];
  }
}
