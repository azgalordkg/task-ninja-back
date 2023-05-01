import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LabelsService } from './labels.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Label } from './entities/label.entity';
import { RolesDecorator } from '../auth/role-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { CreateLabelDto } from './dto/create-label.dto';

@Controller('labels')
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @ApiOperation({ summary: 'Create label' })
  @ApiResponse({ status: 200, type: Label })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Post()
  createLabel(@Body() dto: CreateLabelDto) {
    return this.labelsService.createLabel(dto);
  }

  @ApiOperation({ summary: 'Get label by id' })
  @ApiResponse({ status: 200, type: Label })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get('/:id')
  getLabelById(@Param('id') id: number) {
    return this.labelsService.getLabelById(id);
  }

  @ApiOperation({ summary: 'Update label' })
  @ApiResponse({ status: 200, type: Label })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Put('/:id')
  updateLabel(@Param('id') id: number, @Body() dto: CreateLabelDto) {
    return this.labelsService.updateLabel(id, dto);
  }

  @ApiOperation({ summary: 'Delete label' })
  @ApiResponse({ status: 200, type: Label })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Delete('/:id')
  deleteLabel(@Param('id') id: number) {
    return this.labelsService.deleteLabel(id);
  }

  @ApiOperation({ summary: 'Get all labels' })
  @ApiResponse({ status: 200, type: [Label] })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get()
  getAll() {
    return this.labelsService.getAll();
  }
}
