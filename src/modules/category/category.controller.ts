import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.createOne(body);
  }

  @Patch('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    console.log('hi');
    return this.categoryService.updateOne(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteOne(id);
  }
}
