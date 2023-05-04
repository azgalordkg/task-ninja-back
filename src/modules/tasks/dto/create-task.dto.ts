import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task #1', description: 'Task name' })
  @IsString({ message: 'Must be a string' })
  @Length(3, 30, { message: 'Length must be from 3 to 30' })
  readonly name: string;

  @ApiPropertyOptional({
    example: 'Do something',
    description: 'Task description',
  })
  @IsString({ message: 'Must be a string' })
  readonly description: string;

  @ApiProperty({ example: true, description: 'Task has deadline' })
  @IsBoolean({ message: 'Must be a boolean' })
  readonly hasDeadline: boolean;

  @ApiPropertyOptional({ example: 1, description: 'Task priority' })
  @IsInt({ message: 'Must be a number' })
  readonly priority: number;

  @ApiPropertyOptional({ example: 'Never', description: 'Task repeat' })
  @IsString({ message: 'Must be a string' })
  readonly repeat: string;

  @ApiPropertyOptional({
    example: '2021-01-01',
    description: 'Task start date',
  })
  @IsOptional()
  @IsString({ message: 'Must be a date string' })
  readonly startDate: Date;

  @ApiPropertyOptional({ example: [1, 2], description: 'Task labels' })
  @IsOptional()
  @IsArray({ message: 'Must be a array of numbers' })
  readonly labels: number[];
}
