import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://khalifa:LWFXNnW5guN9kh5d@cluster0.wvydk9u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      { dbName: 'nest-ecommerce' },
    ),
    CategoryModule,
    BrandModule,
    SubcategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
