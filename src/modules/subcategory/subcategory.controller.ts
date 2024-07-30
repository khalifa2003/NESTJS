import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
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
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @Post()
  @HttpCode(201)
  async createSubcategory(@Body() body: CreateSubcategoryDto) {
    return this.subcategoryService.createOne(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @Patch('/:id')
  async updateSubcategory(
    @Param('id') id: string,
    @Body() body: UpdateSubcategoryDto,
  ) {
    return this.subcategoryService.updateOne(id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @Delete('/:id')
  @HttpCode(204)
  async deleteSubcategory(@Param('id') id: string) {
    return this.subcategoryService.deleteOne(id);
  }
}
