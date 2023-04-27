import { ApiProperty } from '@nestjs/swagger';
import { Table } from 'sequelize-typescript';

// Model is created only for Swagger
@Table({ tableName: 'auth' })
export class Auth {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Token',
  })
  private token: string;
}
