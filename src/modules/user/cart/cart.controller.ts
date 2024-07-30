import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartServeice } from './cart.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';

@Controller('product')
export class CartController {
  constructor(private cartServeice: CartServeice) {}
  // @desc    Add product to  cart
  // @route   POST /api/v1/cart
  // @access  Private/User
  @Post()
  @HttpCode(201)
  async addProductToCart(@Body() body: any) {
    this.cartServeice.addOneToCart(body);
  }

  // @desc    Get logged user cart
  // @route   GET /api/v1/cart
  // @access  Private/User
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('/:id')
  async getLoggedUserCart(@Body() body: any) {
    this.cartServeice.getCart(body);
  }

  // @desc    Remove specific cart item
  // @route   DELETE /api/v1/cart/:itemId
  // @access  Private/User
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Patch('/:id')
  async removeSpecificCartItem(@Body() body: any, @Param() params) {
    this.cartServeice.removeOneFromCart(body, params);
  }

  // @desc    clear logged user cart
  // @route   DELETE /api/v1/cart
  // @access  Private/User
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/:id')
  @HttpCode(204)
  async clearCart(@Body() body: any) {
    this.cartServeice.clear(body.user._id);
  }

  // @desc    Update specific cart item quantity
  // @route   PUT /api/v1/cart/:itemId
  // @access  Private/User
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Patch('/:id')
  async updateCartItemQuantity(@Body() body: any, @Param() params) {
    this.cartServeice.updateQuantity(body, params);
  }
}
