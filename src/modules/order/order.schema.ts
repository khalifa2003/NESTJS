import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop([
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: { type: Number, default: 1 },
      price: { type: Number },
    },
  ])
  cartItems: {
    product: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({ type: Number, default: 0 })
  taxPrice: number;

  @Prop({
    type: {
      address: { type: String, required: true },
      phone: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String },
    },
    required: true,
  })
  shippingAddress: {
    address: string;
    phone: string;
    city: string;
    country: string;
    state: string;
    postalCode: string;
  };

  @Prop({ type: Number, default: 0 })
  shippingPrice: number;

  @Prop()
  totalOrderPrice: number;

  @Prop({ type: String, enum: ['card', 'cash'], default: 'cash' })
  paymentMethodType: string;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop()
  paidAt: Date;

  @Prop({ type: Boolean, default: false })
  isDelivered;

  @Prop()
  deliveredAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
