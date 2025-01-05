import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './category.schema';
import { ICategoryRepository } from 'src/common/database-repos/interfaces/category.repository.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  async findOne(id: string): Promise<Category> {
    const product = await this.categoryRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async createOne(createCatgoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.create(createCatgoryDto);
  }

  async updateOne(id: string, updateCategoryDto): Promise<UpdateCategoryDto> {
    const product = await this.categoryRepository.update(id, updateCategoryDto);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return product;
  }

  async deleteOne(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
