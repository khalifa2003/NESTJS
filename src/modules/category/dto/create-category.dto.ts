import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(3, 32)
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly image: string;
}
