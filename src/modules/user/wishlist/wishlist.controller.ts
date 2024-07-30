import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Body,
  Req,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async addProductToWishlist(@Req() req, @Body('productId') productId: string) {
    const userId = req.user._id; // Adjust according to your auth setup
    const user = await this.wishlistService.addProductToWishlist(
      userId,
      productId,
    );
    return {
      status: 'success',
      message: 'Product added successfully to your wishlist.',
      data: user.wishlist,
    };
  }

  @Delete(':productId')
  async removeProductFromWishlist(
    @Req() req,
    @Param('productId') productId: string,
  ) {
    const userId = req.user._id; // Adjust according to your auth setup
    const user = await this.wishlistService.removeProductFromWishlist(
      userId,
      productId,
    );
    return {
      status: 'success',
      message: 'Product removed successfully from your wishlist.',
      data: user.wishlist,
    };
  }

  @Get()
  async getLoggedUserWishlist(@Req() req) {
    const userId = req.user._id; // Adjust according to your auth setup
    const user = await this.wishlistService.getUserWishlist(userId);
    return {
      status: 'success',
      results: user.wishlist.length,
      data: user.wishlist,
    };
  }
}
