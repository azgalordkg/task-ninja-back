import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsString({ message: 'Must be a string' })
  readonly email: string;

  @ApiProperty({ example: 'Password_777', description: 'User password' })
  @IsString({ message: 'Must be a string' })
  @Length(6, 12, { message: 'Length must be from 6 to 12' })
  readonly password: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  fullname?: string;
}
