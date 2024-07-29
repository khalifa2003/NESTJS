import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  HttpCode,
  Param,
  Body,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async getBrands() {
    return this.brandService.findAll();
  }

  @Get('/:id')
  async getBrand(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async createBrand(@Body() body: CreateBrandDto) {
    return this.brandService.createOne(body);
  }

  @Patch('/:id')
  async updateBrand(@Param('id') id: string, @Body() body: UpdateBrandDto) {
    return this.brandService.updateOne(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteOne(id);
  }
}
