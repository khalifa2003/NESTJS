import { IsString, Length } from 'class-validator';

export class CreateBrandDto {
  @Length(2, 32)
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly image: string;
}
