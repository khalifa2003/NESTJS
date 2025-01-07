import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user.schema';
import { Product } from 'src/modules/product/product.schema';

@Injectable()
export class WishlistService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async addProductToWishlist(userId: string, productId: string): Promise<User> {
    const user = this.userModel
      .findByIdAndUpdate(
        userId,
        { $addToSet: { wishlist: productId } },
        { new: true },
      )
      .populate({
        path: 'wishlist',
        model: Product.name,
      })
      .exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async removeProductFromWishlist(
    userId: string,
    productId: string,
  ): Promise<User> {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { wishlist: productId } },
        { new: true },
      )
      .populate({
        path: 'wishlist',
        model: Product.name,
      })
      .exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getUserWishlist(userId: string): Promise<User> {
    const user = await this.userModel
      .findById(userId)
      .populate({
        path: 'wishlist',
        model: Product.name,
      })
      .exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
  async getWishlistProductIds(userId: string): Promise<any> {
    const user = await this.userModel
      .findById(userId)
      .select('wishlist')
      .exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.wishlist;
  }
}
