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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Label } from './entities/label.entity';
import { RolesDecorator } from '../../decorators/role-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { CreateLabelDto } from './dto/create-label.dto';
import { UserDecorator } from '../../decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Labels')
@Controller('labels')
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  @ApiOperation({ summary: 'Create label' })
  @ApiResponse({ status: 200, type: Label })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Post()
  createLabel(@Body() dto: CreateLabelDto, @UserDecorator() user: User) {
    return this.labelsService.createLabel(dto, user.id);
  }

  @ApiOperation({ summary: 'Get label by id' })
  @ApiResponse({ status: 200, type: Label })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get('/:id')
  getLabelById(@Param('id') id: number, @UserDecorator() user: User) {
    return this.labelsService.getLabelById(id, user.id);
  }

  @ApiOperation({ summary: 'Update label' })
  @ApiResponse({ status: 200, type: Label })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Put('/:id')
  updateLabel(
    @Param('id') id: number,
    @Body() dto: CreateLabelDto,
    @UserDecorator() user: User,
  ) {
    return this.labelsService.updateLabel(id, dto, user.id);
  }

  @ApiOperation({ summary: 'Delete label' })
  @ApiResponse({ status: 200, type: Label })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Delete('/:id')
  deleteLabel(@Param('id') id: number, @UserDecorator() user: User) {
    return this.labelsService.deleteLabel(id, user.id);
  }

  @ApiOperation({ summary: 'Get all labels' })
  @ApiResponse({ status: 200, type: [Label] })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get()
  getAll(@UserDecorator() user: User) {
    return this.labelsService.getAll(user.id);
  }
}
