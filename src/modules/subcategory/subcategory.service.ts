import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { Subcategory } from './subcategory.schema';
import { ISubcategoryRepository } from 'src/common/database repos/interfaces/subcategory.repository.interface';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';

@Injectable()
export class SubcategoryService {
  constructor(
    @Inject('SubcategoryRepository')
    private readonly subcategoryRepository: ISubcategoryRepository,
  ) {}

  async findAll(): Promise<Subcategory[]> {
    return this.subcategoryRepository.findAll();
  }

  async findOne(id: string): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.findById(id);
    if (!subcategory) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return subcategory;
  }

  async createOne(
    createSubcategoryDto: CreateSubcategoryDto,
  ): Promise<Subcategory> {
    return this.subcategoryRepository.create(createSubcategoryDto);
  }

  async updateOne(
    id: string,
    updateSubcategoryDto: UpdateSubcategoryDto,
  ): Promise<Subcategory> {
    const subcategory = await this.subcategoryRepository.update(
      id,
      updateSubcategoryDto,
    );
    if (!subcategory) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return subcategory;
  }

  async deleteOne(id: string): Promise<void> {
    await this.subcategoryRepository.delete(id);
  }
}
