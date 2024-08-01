import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/user/cart/cart.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReviewModule } from './modules/review/review.module';
import { AddressModule } from './modules/user/address/addres.module';
import { WishlistModule } from './modules/user/wishlist/wishlist.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductService } from './modules/product/product.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      dbName: process.env.DB_NAME,
    }),
    CategoryModule,
    BrandModule,
    SubcategoryModule,
    ProductModule,
    UserModule,
    CartModule,
    AuthModule,
    ReviewModule,
    AddressModule,
    WishlistModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProductService],
})
export class AppModule {}
