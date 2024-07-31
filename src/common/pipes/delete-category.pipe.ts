import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
export class DeleteCategoryPipe implements PipeTransform {
  async transform(value: any) {
    
  }
}
