import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from 'src/common/enums/role.enum';
import { Address, AddressSchema } from './address/address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, trim: true, required: true })
  fname: string;

  @Prop({ type: String, trim: true, required: true })
  lname: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ unique: true, required: true })
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

  @Prop({ default: ['user'] })
  roles: Role[];

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  wishlist: Types.ObjectId[];

  @Prop({ type: [AddressSchema], default: [] })
  addresses: Address[];
}

export const UserSchema = SchemaFactory.createForClass(User);
