import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  _id?: string;

  @Prop({ type: String, trim: true, required: true })
  fname: string;

  @Prop({ type: String, trim: true, required: true })
  lname: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  image: string;

  @Prop({ type: String, minlength: 6 })
  password: string;

  @Prop()
  passwordChangedAt: Date;

  @Prop()
  passwordResetCode: string;

  @Prop()
  passwordResetExpires: number;

  @Prop()
  passwordResetVerified: boolean;

  @Prop({ type: String, enum: ['user', 'manager', 'admin'], default: 'user' })
  role: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Product' })
  wishlist: [Types.ObjectId];

  @Prop({
    type: {
      fname: { type: String, required: true },
      lname: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: false },
    },
  })
  address: [
    {
      fname: string;
      lname: string;
      phone: string;
      address: string;
      city: string;
      country: string;
      state: string;
      postalCode: string;
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
