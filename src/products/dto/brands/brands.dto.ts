import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}
export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
