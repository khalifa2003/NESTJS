import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './orders.schema';
import { Cart, CartSchema } from '../user/cart/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    AuthModule,
    UserModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrdersModule {}
