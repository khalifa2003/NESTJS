import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import mongoose from 'mongoose';

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

  @Prop({ type: Number, default: 0 })
  discount: number;

  @Prop({ required: true })
  images: string[];

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subcategory', required: true })
  subcategory: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Brand' })
  brand: Types.ObjectId;

  @Prop({
    type: Number,
    min: [1, 'Rating must be above or equal 1.0'],
    max: [5, 'Rating must be below or equal 5.0'],
  })
  ratingsAverage?: number;

  @Prop({ type: Number, default: 0 })
  ratingsQuantity?: number;

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
    required: false,
  })
  specs?: {
    refreshRate: string;
    processor: string;
    graphics: string;
    storage: string;
    display: string;
    memory: string;
    os: string;
  };

  @Prop({ type: Number, default: 0 })
  sold?: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre(/^find/, function (next) {
  const query = this as mongoose.Query<any, any>;
  query.populate({
    path: 'category',
    select: ['name', 'image'],
  });
  query.populate({
    path: 'brand',
    select: ['name', 'image'],
  });
  query.populate({
    path: 'subcategory',
    select: ['name'],
  });
  next();
});

ProductSchema.virtual('priceAfterDiscount').get(function () {
  if (this.discount && this.discount > 0) {
    return this.price - (this.price * this.discount) / 100;
  }
  return this.price;
});

ProductSchema.virtual('stock').get(function () {
  if (this.quantity === 0) {
    return 'OUTOFSTOCK';
  } else if (this.quantity > 0 && this.quantity <= 10) {
    return 'LOWSTOCK';
  } else {
    return 'INSTOCK';
  }
});
