import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({
    type: [
      {
        product: { type: Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    required: true,
  })
  products: Array<{ product: Types.ObjectId; quantity: number; price: number }>;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ type: String, enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'], default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'Address', required: true })
  shippingAddress: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

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
