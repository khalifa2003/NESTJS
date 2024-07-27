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
  getBrands() {
    return this.brandService.findAll();
  }

  @Get('/:id')
  getBrand(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  createBrand(@Body('') body: CreateBrandDto) {
    return this.brandService.createOne(body);
  }

  @Patch('/:id')
  updateBrand(@Param('id') id: string, @Body('body') body: UpdateBrandDto) {
    return this.brandService.UpdateOne(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteOne(id);
  }
}
