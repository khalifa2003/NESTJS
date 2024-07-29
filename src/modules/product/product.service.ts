import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private ProductSchema: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.ProductSchema.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.ProductSchema.findById(id);
    return product;
  }

  async createOne(createProductDto: CreateProductDto): Promise<Product> {
    const product = await new this.ProductSchema(createProductDto);
    return product.save();
  }

  async updateOne(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    const product = await this.ProductSchema.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );
    return product;
  }

  async deleteOne(id: string): Promise<void> {
    await this.ProductSchema.findByIdAndDelete(id);
  }
}
