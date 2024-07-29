import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({ timestamps: true })
export class Brand {
  @Prop({
    required: true,
    minlength: [2, 'Too short brand name'],
    maxlength: [32, 'Too long brand name'],
    unique: true,
  })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
