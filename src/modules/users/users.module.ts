import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { UserRole } from './entities/user-role.entity';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { UserTask } from './entities/user-task.entity';
import { Task } from '../tasks/entities/task.entity';
import { TasksModule } from '../tasks/tasks.module';
import { UserLabel } from './entities/user-label.entity';
import { Label } from '../labels/entities/label.entity';
import { LabelsModule } from '../labels/labels.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Role,
      Task,
      Label,
      UserRole,
      UserTask,
      UserLabel,
    ]),
    RolesModule,
    LabelsModule,
    TasksModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
