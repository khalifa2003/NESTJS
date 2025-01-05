import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return category;
  }

  async createOne(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.create(createCategoryDto);
  }

  async updateOne(id: string, updateCategoryDto): Promise<UpdateCategoryDto> {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return category;
  }

  async deleteOne(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id).exec();
  }
}
