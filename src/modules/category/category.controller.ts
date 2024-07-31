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
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { DeleteCategoryPipe } from 'src/common/pipes/delete-category.pipe';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return this.categoryService.findActiveCategories();
  }

  @Get('/deleted')
  async getDeletedCategories() {
    return this.categoryService.findDeletedCategories();
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @Post()
  @HttpCode(201)
  async createCategory(@Body() body: CreateCategoryDto) {
    return this.categoryService.createOne(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @Patch('/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() body: UpdateCategoryDto,
  ) {
    return this.categoryService.updateOne(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @Delete('/soft/:id')
  @HttpCode(204)
  async softDelete(@Param('id', DeleteCategoryPipe) id: string) {
    await this.categoryService.softDelete(id);
    return { message: 'Category marked as deleted' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @Delete('/forever/:id')
  @HttpCode(204)
  async deletepermanently(@Param('id', DeleteCategoryPipe) id: string) {
    return this.categoryService.deleteOne(id);
  }
}
