import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    return category;
  }

  async createOne(createCatgoryDto: CreateCategoryDto): Promise<Category> {
    const category = await new this.categoryModel(createCatgoryDto);
    return category.save();
  }

  async updateOne(id: string, UpdateCategoryDto): Promise<UpdateCategoryDto> {
    const category = await this.categoryModel.findByIdAndUpdate(
      id,
      UpdateCategoryDto,
      { new: true },
    );
    return category;
  }

  async deleteOne(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id);
  }
}
