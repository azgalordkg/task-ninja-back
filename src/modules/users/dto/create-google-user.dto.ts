import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateGoogleUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsString({ message: 'Must be a string' })
  readonly email: string;

  @ApiProperty({ example: true, description: 'Is Google Account' })
  @IsBoolean({ message: 'Must be a boolean' })
  readonly isGoogle: boolean;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  fullname?: string;
}
