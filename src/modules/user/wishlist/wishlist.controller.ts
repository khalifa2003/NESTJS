import { WishlistService } from './wishlist.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Role } from 'src/common/enums/role.enum';
import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param,
  Req,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

@Controller('wishlist')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.Admin, Role.Manager, Role.User)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async addProductToWishlist(@Req() req, @Body() body) {
    const user = await this.wishlistService.addProductToWishlist(
      req.user._id,
      body.productId,
    );

    return user.wishlist;
  }

  @Delete(':productId')
  async removeProductFromWishlist(
    @Req() req,
    @Param('productId') productId: string,
  ) {
    const user = await this.wishlistService.removeProductFromWishlist(
      req.user._id,
      productId,
    );

    return user.wishlist;
  }

  @Get()
  async getUserWishlist(@Req() req) {
    const user = await this.wishlistService.getUserWishlist(req.user._id);

    return user.wishlist;
  }

  @Get(':ids')
  async getUserWishlistIds(@Req() req) {
    const wishlist = await this.wishlistService.getWishlistProductIds(
      req.user._id,
    );
    return wishlist;
  }
}
