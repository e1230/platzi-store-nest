import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
  @IsPhoneNumber()
  readonly phone?: string;
}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
