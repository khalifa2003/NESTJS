import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

export type SubCategoryDocument = Subcategory & Document;

@Schema({ timestamps: true })
export class Subcategory {
  @Prop({ required: true, unique: true, minlength: 2, maxlength: 32 })
  name: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Types.ObjectId;
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
