import { Types } from 'mongoose';

export class CreateCartDto {
  cartItems: [
    {
      product: {
        type: Types.ObjectId;
        ref: 'Product';
      };
      quantity: number;
      price: number;
    },
  ];
}
