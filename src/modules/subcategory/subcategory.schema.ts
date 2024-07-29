import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type SubCategoryDocument = Subcategory & Document;

@Schema({ timestamps: true })
export class Subcategory {
  @Prop({
    required: true,
    unique: true,
    minlength: [2, 'Too short title'],
    maxlength: [32, 'Too long title'],
  })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Types.ObjectId;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
