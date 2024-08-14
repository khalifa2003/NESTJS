import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISubcategoryRepository } from './interfaces/subcategory.repository.interface';
import { Subcategory } from 'src/modules/subcategory/subcategory.schema';

@Injectable()
export class SubcategoryRepository implements ISubcategoryRepository {
  constructor(
    @InjectModel(Subcategory.name) private subcategoryModel: Model<Subcategory>,
  ) {}

  async create(subcategory: Subcategory): Promise<Subcategory> {
    const newSubcategory = new this.subcategoryModel(subcategory);
    return newSubcategory.save();
  }

  async findAll(category: string): Promise<Subcategory[]> {
    if (category == '') {
      return this.subcategoryModel.find().exec();
    } else {
      return await this.subcategoryModel.find({ category }).exec();
    }
  }

  async findById(id: string): Promise<Subcategory> {
    return this.subcategoryModel.findById(id).exec();
  }

  async update(
    id: string,
    subcategory: Partial<Subcategory>,
  ): Promise<Subcategory> {
    return this.subcategoryModel
      .findByIdAndUpdate(id, subcategory, { new: true })
      .exec();
  }

  async delete(id: string): Promise<void> {
    await this.subcategoryModel.findByIdAndDelete(id).exec();
  }
}
