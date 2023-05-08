import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleRegisterDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3NzBiMDg1YmY2NDliNzI2YjM1NzQ3NjQwMzBlMWJkZTlhMTBhZTYiLCJ0eXAiOiJKV1QifQ',
    description: 'Google idToken',
  })
  @IsString({ message: 'Must be a string' })
  readonly token: string;
}
