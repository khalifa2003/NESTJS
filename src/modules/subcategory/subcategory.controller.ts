
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SubcategoryService } from './subcategory.service';
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

@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get()
  async getSubcategories() {
    return this.subcategoryService.findAll();
  }

  @Get('/:id')
  async getSubcategory(@Param('id') id: string) {
    return this.subcategoryService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async createSubcategory(@Body() body: CreateSubcategoryDto) {
    return this.subcategoryService.createOne(body);
  }

  @Patch('/:id')
  async updateSubcategory(
    @Param('id') id: string,
    @Body() body: UpdateSubcategoryDto,
  ) {
    return this.subcategoryService.updateOne(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteSubcategory(@Param('id') id: string) {
    return this.subcategoryService.deleteOne(id);
  }
}
