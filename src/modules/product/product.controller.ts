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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
  @HttpCode(201)
  async createProduct(@Body() body: CreateProductDto) {
    return this.productService.createOne(body);
  }

  @Patch('/:id')
  async updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productService.updateOne(id, body);
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteOne(id);
  }
}
