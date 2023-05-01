import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface TaskCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Task #1', description: 'Task name' })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({ example: 'Do something', description: 'Task description' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @ApiProperty({ example: true, description: 'Task has deadline' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  hasDeadline: boolean;

  @ApiProperty({ example: 1, description: 'Task priority' })
  @Column({
    type: DataType.INTEGER,
  })
  priority: number;

  @ApiProperty({ example: 'Never', description: 'Task repeat' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  repeat: string;

  @ApiProperty({ example: '2021-01-01', description: 'Task start date' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  startDate: Date;
}
