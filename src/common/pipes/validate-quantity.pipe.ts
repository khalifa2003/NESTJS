import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
export class ValidateQuantityPipe implements PipeTransform {
  constructor(private readonly productService: ProductService) {}
  async transform(value: any) {
    const { _id, quantity } = value;
    if (!quantity || quantity <= 0) {
      throw new BadRequestException('Quantity must be a positive number.');
    }

    const product = await this.productService.findOne(_id);
    if (!product) {
      throw new BadRequestException('Product not found.');
    }

    if (quantity > product.quantity) {
      throw new BadRequestException(
        `Only ${product.quantity} items available in stock.`,
      );
    }
    return value;
  }
}
