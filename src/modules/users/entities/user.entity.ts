import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/entities/role.entity';
import { UserRole } from './user-role.entity';
import { Task } from '../../tasks/entities/task.entity';
import { UserTask } from './user-task.entity';

interface UserCreationAttrs {
  email: string;
  password: string;
  fullname?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'Email of user' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: 'Password_007', description: 'Password of user' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @ApiProperty({ example: true, description: 'Is user google' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  isGoogle: boolean;

  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  fullname: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];

  @BelongsToMany(() => Task, () => UserTask)
  tasks: Task[];
}
