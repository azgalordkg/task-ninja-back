import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './modules/users/entities/user.entity';
import { Role } from './modules/roles/entities/role.entity';
import { UserRole } from './modules/users/entities/user-role.entity';
import { AuthModule } from './modules/auth/auth.module';
import { RolesModule } from './modules/roles/roles.module';
import { Label } from './modules/labels/entities/label.entity';
import { LabelsModule } from './modules/labels/labels.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { Task } from './modules/tasks/entities/task.entity';
import { TaskLabel } from './modules/tasks/entities/task-label.entity';
import { UserTask } from './modules/users/entities/user-task.entity';
import { UserLabel } from './modules/users/entities/user-label.entity';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      ...(process.env.PRODUCTION
        ? {
            dialectOptions: {
              ssl: {
                require: true,
                rejectUnauthorized: false,
              },
            },
          }
        : {}),
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT || 5432),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Role,
        UserRole,
        UserTask,
        UserLabel,
        Task,
        Label,
        TaskLabel,
      ],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    TasksModule,
    LabelsModule,
  ],
})
export class AppModule {}
