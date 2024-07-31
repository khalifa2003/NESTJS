import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    required: true,
    minlength: [3, 'Too short name'],
    maxlength: [32, 'Too short name'],
    unique: true,
  })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
