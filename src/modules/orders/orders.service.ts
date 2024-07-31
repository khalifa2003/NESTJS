import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { Order } from './orders.schema';

@Injectable()
export class OrdersService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(
      this.configService.get<string>('STRIPE_SECRET_KEY'),
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  async createCashOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel
      .findById(orderId)
      .populate('user products.product shippingAddress')
      .exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    return order;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return this.orderModel
      .find({ user: userId })
      .populate('products.product shippingAddress')
      .exec();
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderModel
      .find()
      .populate('user products.product shippingAddress')
      .exec();
  }

  async updateOrderToPaid(orderId: string): Promise<Order> {
    const order = await this.getOrderById(orderId);
    order.isPaid = true;
    order.paidAt = new Date();
    return order.save();
  }

  async updateOrderToDelivered(orderId: string): Promise<Order> {
    const order = await this.getOrderById(orderId);
    order.isDelivered = true;
    order.deliveredAt = new Date();
    return order.save();
  }

  async checkoutSession(userId: string, cartItems: any[]): Promise<any> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
            images: [item.product.images[0]],
          },
          unit_amount: item.product.price * 100, // Stripe expects amount in cents
        },
        quantity: item.quantity,
      })),
      success_url: `${this.configService.get<string>('FRONTEND_URL')}/success`,
      cancel_url: `${this.configService.get<string>('FRONTEND_URL')}/cancel`,
      metadata: {
        userId: userId,
      },
    });
    return { sessionId: session.id };
  }

  async webhookCheckout(data: any): Promise<void> {
    const event = this.stripe.webhooks.constructEvent(
      data.rawBody,
      data.headers['stripe-signature'],
      this.configService.get<string>('STRIPE_WEBHOOK_SECRET'),
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata.userId;

      // Retrieve line items from the session
      const lineItems = await this.stripe.checkout.sessions.listLineItems(
        session.id,
      );

      const products = lineItems.data.map((item) => ({
        product: item.price.product as string,
        quantity: item.quantity,
        price: item.amount_total / 100,
      }));

      const order = new this.orderModel({
        user: userId,
        products: products,
        totalAmount: session.amount_total / 100,
        status: 'pending',
        isPaid: true,
        paidAt: new Date(),
      });

      await order.save();
    }
  }
}
