import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
  @Prop([
    {
      _id: Types.ObjectId,
      product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number },
      createdAt: { type: Date, default: Date.now },
    },
  ])
  cartItems: [
    {
      _id?: Types.ObjectId;
      product: Types.ObjectId;
      quantity: number;
      price: number;
      createdAt: Date;
    },
  ];

  @Prop()
  totalCartPrice: number;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
