import { ApiPropertyOptional } from '@nestjs/swagger';

export class EditUserDto {
  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'User email',
  })
  email?: string;

  @ApiPropertyOptional({ example: 'John Doe', description: 'User full name' })
  fullname?: string;
}
