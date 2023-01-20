import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsPositive, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly orderId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly productId: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  readonly quantity: number;
}
export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {}
