import { Injectable } from '@nestjs/common';
import { Brand } from './brand.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brand.name) private BrandSchema: Model<Brand>) {}

  async findAll(): Promise<Brand[]> {
    return await this.BrandSchema.find().exec();
  }

  async findOne(id: string): Promise<Brand> {
    const brand = await this.BrandSchema.findById(id);
    return brand;
  }

  async createOne(createBrandDto: CreateBrandDto): Promise<Brand> {
    const brand = await new this.BrandSchema(createBrandDto);
    return brand.save();
  }

  async updateOne(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<UpdateBrandDto> {
    const brand = await this.BrandSchema.findByIdAndUpdate(id, updateBrandDto, {
      new: true,
    });
    return brand;
  }

  async deleteOne(id: string): Promise<void> {
    await this.BrandSchema.findByIdAndDelete(id);
  }
}
