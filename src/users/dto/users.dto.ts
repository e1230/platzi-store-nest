import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsPositive } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly id: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'email`s user',
  })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly role: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly customerId: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class FilterUsersDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
