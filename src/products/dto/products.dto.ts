import { PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly brandId: number;

  @IsArray()
  @IsNotEmpty()
  readonly categoriesIds: number[];
}
export class UpdateProductDto extends PartialType(CreateProductDto) {}
export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
// export class UpdateProductDto {
//   readonly name?: string;
//   readonly description?: string;
//   readonly price?: number;
//   readonly stock?: number;
//   readonly image?: string;
// }
