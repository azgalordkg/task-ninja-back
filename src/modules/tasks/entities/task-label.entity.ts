import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Label } from '../../labels/entities/label.entity';
import { Task } from './task.entity';

@Table({ tableName: 'task_labels', createdAt: false, updatedAt: false })
export class TaskLabel extends Model<TaskLabel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Label)
  @Column({ type: DataType.INTEGER })
  labelId: number;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER })
  taskId: number;
}
