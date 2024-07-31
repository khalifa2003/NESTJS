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
    @InjectModel(Category.name) private productModel: Model<Category>,
  ) {}

  async findActiveCategories(): Promise<Category[]> {
    return this.categoryModel.find({ isDeleted: false }).exec();
  }

  async findDeletedCategories(): Promise<Category[]> {
    return this.categoryModel.find({ isDeleted: true }).exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);
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

  async softDelete(id: string): Promise<void> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.isDeleted = true;
    category.deletedAt = new Date();
  }

  async deleteOne(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id);
  }
}
