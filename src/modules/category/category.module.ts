import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './category.schema';
import { ProductService } from '../product/product.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { Product, ProductSchema } from '../product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
    UserModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, ProductService],
  exports: [MongooseModule],
})
export class CategoryModule {}
