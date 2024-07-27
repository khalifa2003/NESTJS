import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandService } from './brand.service';
import { Brand, BrandSchema } from './brand.schema';
import { BrandController } from './brand.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [],
})
export class BrandModule {}
