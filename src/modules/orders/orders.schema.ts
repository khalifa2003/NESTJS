import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop([
    {
      product: { type: Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number,
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
      address: String,
      phone: String,
      city: String,
      postalCode: String,
      state: String,
      country: String,
    },
  })
  shippingAddress: {
    address: string;
    phone: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
  };

  @Prop({ type: Number, default: 0 })
  shippingPrice: number;

  @Prop({ type: Number })
  totalOrderPrice: number;

  @Prop({
    type: String,
    enum: ['card', 'cash'],
    default: 'cash',
  })
  paymentMethodType: string;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: Date })
  paidAt: Date;

  @Prop({ type: Boolean, default: false })
  isDelivered: boolean;

  @Prop({ type: Date })
  deliveredAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.pre(/^find/, function (next) {
  const query = this as mongoose.Query<any, any>;
  query
    .populate({
      path: 'user',
      select: ['fname', 'lname', 'image', 'email', 'phone'],
    })
    .populate({
      path: 'cartItems.product',
      select: 'title images',
    });
  next();
});
