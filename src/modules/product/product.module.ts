import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { CategoryModule } from '../category/category.module';
import { SubcategoryModule } from '../subcategory/subcategory.module';
import { BrandModule } from '../brand/brand.module';
import { ProductRepository } from 'src/common/database repos/product.repository';
// 1
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
    UserModule,
    forwardRef(() => CategoryModule),

    SubcategoryModule,
    BrandModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    { provide: 'ProductRepository', useClass: ProductRepository },
  ],
  exports: [MongooseModule, ProductService, 'ProductRepository'],
})
export class ProductModule {}
