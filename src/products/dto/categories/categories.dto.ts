import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsPositive,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class FilterCategoriesDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
