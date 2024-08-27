import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../orders/orders.schema';
import { Product, ProductSchema } from '../product/product.schema';
import { User, UserSchema } from '../user/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Review, ReviewSchema } from '../review/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: ProductSchema },
      { name: User.name, schema: UserSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
