import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
  // to enable virtual populate
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  @Prop({
    required: true,
    trim: true,
    minlength: [3, 'Too short product title'],
  })
  title: string;

  @Prop({ required: true, minlength: [20, 'Too short product description'] })
  description: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({
    required: true,
    trim: true,
    max: [2000000, 'Too long product price'],
  })
  price: number;

  @Prop({ required: true })
  images: string[];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop([{ type: Types.ObjectId, ref: 'SubCategory' }])
  subcategories: Types.ObjectId[];

  @Prop({ type: Types.ObjectId, ref: 'Brand' })
  brand: Types.ObjectId;

  @Prop({
    type: Number,
    min: [1, 'Rating must be above or equal 1.0'],
    max: [5, 'Rating must be below or equal 5.0'],
  })
  ratingsAverage: number;

  @Prop({ type: Number, default: 0 })
  ratingsQuantity: number;

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

  @Prop({ default: false })
  isDeleted: boolean; // Add this field

  @Prop()
  deletedAt?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
