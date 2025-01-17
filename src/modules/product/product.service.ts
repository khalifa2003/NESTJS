import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(queryParams: any): Promise<Product[]> {
    const query: any = {};

    if (queryParams) {
      const keys = Object.keys(queryParams);
      const values: any = Object.values(queryParams);

      for (let i = 0; i < keys.length; i++) {
        if (values[i] == '') {
          continue;
        } else if (keys[i] === 'min' || keys[i] === 'max') {
          query[keys[i]] = +values[i];
        } else if (
          keys[i] === 'category' ||
          keys[i] === 'brand' ||
          keys[i] === 'subcategory'
        ) {
          if (values[i].includes(',')) {
            query[keys[i]] = { $in: values[i].split(',') };
          } else {
            query[keys[i]] = values[i];
          }
        } else {
          query[keys[i]] = new RegExp(values[i], 'i');
        }
      }
    }

    let documents = await this.productModel.find(query).exec();

    if (queryParams.min && queryParams.max) {
      documents = documents.filter(
        (product) =>
          product.price >= queryParams.min && product.price <= queryParams.max,
      );
    }

    return documents;
  }

  async findOne(id: string): Promise<Product> {
    const product = this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async createOne(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async updateOne(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async deleteOne(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }

  async findBy(data): Promise<Product[]> {
    return this.productModel.find(data).exec();
  }

  async getHomeProducts(): Promise<any> {
    const NOTEBOOK = await this.productModel
      .find({ category: '665b9e7eee20a57f1c86a3df' })
      .exec();
    const DESKTOP = await this.productModel
      .find({ category: '665b9e66ee20a57f1c86a3dd' })
      .exec();
    const STORAGE = await this.productModel
      .find({ category: '665b9e9cee20a57f1c86a3e1' })
      .exec();
    const MONITOR = await this.productModel
      .find({ category: '665b9ebaee20a57f1c86a3e3' })
      .exec();
    const ACCESSORIES = await this.productModel
      .find({ category: '665b9ee3ee20a57f1c86a3e7' })
      .exec();

    return [
      { name: 'NOTEBOOK', products: NOTEBOOK },
      { name: 'ACCESSORIES', products: ACCESSORIES },
      { name: 'DESKTOP', products: DESKTOP },
      { name: 'MONITOR', products: MONITOR },
      { name: 'STORAGE', products: STORAGE },
    ];
  }
}
