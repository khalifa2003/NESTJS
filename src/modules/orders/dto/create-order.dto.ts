import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsMongoId,
} from 'class-validator';

export class CreateOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @IsArray()
  @IsNotEmpty()
  products: Array<{ product: string; quantity: number; price: number }>;

  @IsNumber()
  @IsNotEmpty()
  totalAmount: number;

  @IsMongoId()
  @IsNotEmpty()
  shippingAddress: string;
}
