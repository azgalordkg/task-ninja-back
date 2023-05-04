import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { Label } from '../labels/entities/label.entity';
import { TaskLabel } from './entities/task-label.entity';
import { LabelsModule } from '../labels/labels.module';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/entities/user.entity';
import { UserTask } from '../users/entities/user-task.entity';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([Task, Label, User, TaskLabel, UserTask]),
    LabelsModule,
  ],
})
export class TasksModule {}
