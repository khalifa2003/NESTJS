import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBrandRepository } from './interfaces/brand.repository.interface';
import { Brand } from 'src/modules/brand/brand.schema';

@Injectable()
export class BrandRepository implements IBrandRepository {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async create(brand: Brand): Promise<Brand> {
    const newBrand = new this.brandModel(brand);
    return newBrand.save();
  }

  async findAll(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }

  async findById(id: string): Promise<Brand> {
    return this.brandModel.findById(id).exec();
  }

  async update(id: string, brand: Partial<Brand>): Promise<Brand> {
    return this.brandModel.findByIdAndUpdate(id, brand, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.brandModel.findByIdAndDelete(id).exec();
  }
}
