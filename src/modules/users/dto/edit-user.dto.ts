import { ApiPropertyOptional } from '@nestjs/swagger';

export class EditUserDto {
  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'User email',
  })
  email?: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'User full name' })
  fullname?: string;

  @ApiPropertyOptional({
    example: 'Password_007',
    description: 'User password',
  })
  password?: string;

  @ApiPropertyOptional({
    example: 'Password_007',
    description: 'User password',
  })
  oldPassword?: string;
}
