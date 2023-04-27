import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { Role } from './entities/role.entity';
import { UserRole } from '../users/entities/user-role.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [AuthModule, SequelizeModule.forFeature([User, Role, UserRole])],
  exports: [RolesService],
})
export class RolesModule {}
