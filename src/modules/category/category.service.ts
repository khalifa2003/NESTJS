import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategorySchema: Model<Category>,
  ) {
  }

  async findAll(): Promise<Category[]> {
    return await this.CategorySchema.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.CategorySchema.findById(id);
    return category;
  }

  async createOne(createCatgoryDto: CreateCategoryDto): Promise<Category> {
    const category = await new this.CategorySchema(createCatgoryDto);
    return category.save();
  }

  async updateOne(id: string, UpdateCategoryDto): Promise<UpdateCategoryDto> {
    const category = await this.CategorySchema.findByIdAndUpdate(
      id,
      UpdateCategoryDto,
      { new: true },
    );
    return category;
  }

  async deleteOne(id: string): Promise<void> {
    await this.CategorySchema.findByIdAndDelete(id);
  }
}
