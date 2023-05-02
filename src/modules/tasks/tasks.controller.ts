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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { RolesDecorator } from '../../decorators/role-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { User } from '../users/entities/user.entity';
import { UserDecorator } from '../../decorators/user.decorator';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Task creation' })
  @ApiResponse({ status: 200, type: Task })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Post()
  create(@Body() dto: CreateTaskDto, @UserDecorator() user: User) {
    return this.tasksService.createTask(dto, user.id);
  }

  @ApiOperation({ summary: 'Tasks list' })
  @ApiResponse({ status: 200, type: [Task] })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get()
  getAll(@UserDecorator() user: User) {
    return this.tasksService.getAll(user.id);
  }

  @ApiOperation({ summary: 'Tasks by id' })
  @ApiResponse({ status: 200, type: Task })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get('/:id')
  getById(@Param('id') id: number, @UserDecorator() user: User) {
    return this.tasksService.getById(id, user.id);
  }

  @ApiOperation({ summary: 'Update Task' })
  @ApiResponse({ status: 200, type: Task })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Put('/:id')
  updateTask(
    @Param('id') id: number,
    @Body() dto: CreateTaskDto,
    @UserDecorator() user: User,
  ) {
    return this.tasksService.updateTask(id, dto, user.id);
  }

  @ApiOperation({ summary: 'Delete Task' })
  @ApiResponse({ status: 200, type: Task })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Delete('/:id')
  deleteTask(@Param('id') id: number, @UserDecorator() user: User) {
    return this.tasksService.deleteTask(id, user.id);
  }
}
