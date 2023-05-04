import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.entity';
import { Label } from '../../labels/entities/label.entity';

@Table({ tableName: 'user_task', createdAt: false, updatedAt: false })
export class UserLabel extends Model<UserLabel> {
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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
