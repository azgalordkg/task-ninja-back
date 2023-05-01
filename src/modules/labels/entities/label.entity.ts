import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

interface LabelCreationAttrs {
  name: string;
  color: string;
  isDefault?: boolean;
}

@Table({ tableName: 'labels' })
export class Label extends Model<Label, LabelCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Work', description: 'Label name' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: '#ffffff', description: 'Label color' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @ApiProperty({ example: false, description: 'Label is default' })
  @Column({ defaultValue: false, type: DataType.BOOLEAN, allowNull: true })
  isDefault: boolean;
}
