import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema } from 'mongoose';

export type UserDocument = HydratedDocument<Address>;

export class Address {
  @Prop({ type: String, required: true })
  fname: string;

  @Prop({ type: String, required: true })
  lname: string;

  @Prop({ type: String, required: true })
  phone: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String, required: false })
  postalCode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
