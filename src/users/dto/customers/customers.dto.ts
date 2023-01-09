import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
  @IsPhoneNumber('CO')
  readonly phone?: string;
}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
