import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Task } from '../../tasks/entities/task.entity';

@Table({ tableName: 'user_tasks', createdAt: false, updatedAt: false })
export class UserTask extends Model<UserTask> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER })
  taskId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
