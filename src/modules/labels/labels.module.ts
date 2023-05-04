import { Module } from '@nestjs/common';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Label } from './entities/label.entity';
import { AuthModule } from '../auth/auth.module';
import { Task } from '../tasks/entities/task.entity';
import { TaskLabel } from '../tasks/entities/task-label.entity';
import { User } from '../users/entities/user.entity';
import { UserLabel } from '../users/entities/user-label.entity';

@Module({
  controllers: [LabelsController],
  providers: [LabelsService],
  imports: [
    AuthModule,
    SequelizeModule.forFeature([Label, Task, User, TaskLabel, UserLabel]),
  ],
  exports: [LabelsService],
})
export class LabelsModule {}
