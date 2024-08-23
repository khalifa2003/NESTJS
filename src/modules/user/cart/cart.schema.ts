import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop([
    {
      _id: { type: Types.ObjectId, auto: true },
      product: { type: Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
      price: { type: Number },
    },
  ])
  cartItems: {
    _id: Types.ObjectId;
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop()
  totalCartPrice: number;

  @Prop()
  totalPriceAfterDiscount?: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.virtual('populatedCartItems', {
  ref: 'Product', // Model to use
  localField: 'cartItems.product', // Field in Cart schema
  foreignField: '_id', // Field in Product schema
  justOne: false,
});
