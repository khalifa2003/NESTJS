import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Brand } from './brand.schema';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { IBrandRepository } from '../../common/database repos/interfaces/brand.repository.interface';

@Injectable()
export class BrandService {
  constructor(
    @Inject('BrandRepository')
    private readonly brandRepository: IBrandRepository,
  ) {}

  async findAll(): Promise<Brand[]> {
    return this.brandRepository.findAll();
  }

  async findOne(id: string): Promise<Brand> {
    const brand = this.brandRepository.findById(id);
    if (!brand) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return brand;
  }

  async createOne(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandRepository.create(createBrandDto);
  }

  async updateOne(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<UpdateBrandDto> {
    const brand = await this.brandRepository.update(id, updateBrandDto);
    if (!brand) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
    return brand;
  }

  async deleteOne(id: string): Promise<void> {
    return this.brandRepository.delete(id);
  }
}
