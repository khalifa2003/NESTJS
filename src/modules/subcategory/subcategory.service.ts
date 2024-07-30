import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateCategoryDto } from '../category/dto/update-category.dto';
import { Subcategory } from './subcategory.schema';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel(Subcategory.name)
    private SubcategorySchema: Model<Subcategory>,
  ) {}

  async findAll(): Promise<Subcategory[]> {
    return await this.SubcategorySchema.find().exec();
  }

  async findOne(id: string): Promise<Subcategory> {
    const subcategory = await this.SubcategorySchema.findById(id);
    return subcategory;
  }

  async createOne(
    createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    const subcat = await new this.SubcategorySchema(createSubcategoryDto);
    return subcat.save();
  }

  async updateOne(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Subcategory> {
    const subcategory = await this.SubcategorySchema.findByIdAndUpdate(
      id,
      updateCategoryDto,
      { new: true },
    );
    return subcategory;
  }

  async deleteOne(id: string): Promise<void> {
    await this.SubcategorySchema.findByIdAndDelete(id);
  }
}
