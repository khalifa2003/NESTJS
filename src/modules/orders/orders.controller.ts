import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
  Req,
  Res,
  RawBodyRequest,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Order } from './orders.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('cash')
  @UseGuards(JwtAuthGuard)
  async createCashOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req,
  ): Promise<Order> {
    return this.ordersService.createCashOrder({
      ...createOrderDto,
      user: req.user._id,
    });
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string): Promise<Order> {
    return this.ordersService.getOrderById(orderId);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getOrdersByUserId(@Param('userId') userId: string): Promise<Order[]> {
    return this.ordersService.getOrdersByUserId(userId);
  }

  @Get()
  async findAllOrders(): Promise<Order[]> {
    return this.ordersService.findAllOrders();
  }

  @Patch(':id/paid')
  async updateOrderToPaid(@Param('id') orderId: string): Promise<Order> {
    return this.ordersService.updateOrderToPaid(orderId);
  }

  @Patch(':id/delivered')
  async updateOrderToDelivered(@Param('id') orderId: string): Promise<Order> {
    return this.ordersService.updateOrderToDelivered(orderId);
  }

  @Post('checkout')
  @UseGuards(JwtAuthGuard)
  async checkoutSession(@Req() req): Promise<any> {
    return this.ordersService.checkoutSession(req.user._id, req.body.cartItems);
  }

  @Post('webhook')
  async webhookCheckout(
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ): Promise<void> {
    await this.ordersService.webhookCheckout({
      rawBody: req.rawBody,
      headers: req.headers,
    });
    res.status(200).send();
  }
}
