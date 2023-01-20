import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly customerId: string;
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
