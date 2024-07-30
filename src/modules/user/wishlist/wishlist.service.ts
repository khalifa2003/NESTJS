import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../user.schema';

@Injectable()
export class WishlistService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addProductToWishlist(userId: string, productId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: new Types.ObjectId(productId) } },
      { new: true },
    );
  }

  async removeProductFromWishlist(
    userId: string,
    productId: string,
  ): Promise<User> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: new Types.ObjectId(productId) } },
      { new: true },
    );
  }

  async getUserWishlist(userId: string): Promise<User> {
    return this.userModel.findById(userId).populate('wishlist');
  }
}
