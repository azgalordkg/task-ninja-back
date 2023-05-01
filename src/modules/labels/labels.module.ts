import { Module } from '@nestjs/common';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Label } from './entities/label.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [LabelsController],
  providers: [LabelsService],
  imports: [AuthModule, SequelizeModule.forFeature([Label])],
  exports: [LabelsService],
})
export class LabelsModule {}
