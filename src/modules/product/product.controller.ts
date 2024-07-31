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
  UsePipes,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ValidateQuantityPipe } from 'src/common/pipes/validate-quantity.pipe';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return this.productService.findAll();
  }

  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @UsePipes(ValidateQuantityPipe)
  @HttpCode(201)
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createOne(body);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.updateOne(id, body);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.Manager)
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteOne(id);
  }
}
