import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/modules/product/product.schema';
import { IProductRepository } from './interfaces/product.repository.interface';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  findBy(data: any): Promise<Product[]> {
    return this.productModel.find(data).exec();
  }

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

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

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.productModel.findByIdAndDelete(id).exec();
  }
}
