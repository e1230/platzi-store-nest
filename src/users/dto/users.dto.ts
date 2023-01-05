import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'email`s user',
  })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6)
  readonly password: string;
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
