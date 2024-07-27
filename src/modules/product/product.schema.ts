import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type CategoryDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  // to enable virtual populate
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  @Prop({ required: true, trim: true, minLength: 5 })
  title: string;

  @Prop({ required: true, minlength: 30 })
  description: string;

  @Prop({ required: true, min: 10, max: 2000000 })
  price: number;

  @Prop({ required: true, min: 5, max: 1000 })
  quantity: number;

  @Prop({
    type: {
      refreshRate: { type: String, required: true },
      processor: { type: String, required: true },
      graphics: { type: String, required: true },
      storage: { type: String, required: true },
      display: { type: String, required: true },
      memory: { type: String, required: true },
      os: { type: String, required: true },
    },
    required: true,
  })
  specs: {
    refreshRate: string;
    processor: string;
    graphics: string;
    storage: string;
    display: string;
    memory: string;
    os: string;
  };

  @Prop({ required: true })
  images: string[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
  })
  brand: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
  })
  subcategory: Types.ObjectId;

  @Prop({ min: 1, max: 5 })
  ratingsAverage: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
