import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';

@Injectable()
export class WishlistService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async addProductToWishlist(
    userId: string,
    productId: string,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $addToSet: { wishlist: productId } },
        { new: true },
      )
      .exec();
  }

  async removeProductFromWishlist(
    userId: string,
    productId: string,
  ): Promise<UserDocument> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { wishlist: productId } },
        { new: true },
      )
      .exec();
  }

  async getUserWishlist(userId: string): Promise<UserDocument> {
    return this.userModel.findById(userId).populate('wishlist').exec();
  }
}
