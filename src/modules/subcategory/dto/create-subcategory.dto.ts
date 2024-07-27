import { IsMongoId, IsString, Length } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSubcategoryDto {
  @Length(3, 32)
  readonly name: string;

  @IsMongoId()
  @IsString()
  readonly category: Types.ObjectId;
}
