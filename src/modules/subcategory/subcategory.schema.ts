import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Category } from '../category/category.schema';

@Schema({ timestamps: true })
export class Subcategory {
  @Prop({
    required: true,
    unique: true,
    minlength: [2, 'Too short title'],
    maxlength: [32, 'Too long title'],
  })
  name: string;

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  category: Types.ObjectId;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
