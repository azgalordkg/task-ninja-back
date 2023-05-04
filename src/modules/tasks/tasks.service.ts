import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private tasksRepository: typeof Task) {}

  async createTask(dto: CreateTaskDto, userId: number) {
    const { labels, ...data } = dto;
    const createdTask = await this.tasksRepository.create({ ...data, userId });

    if (labels) {
      await createdTask.$set('labels', labels);
    }
    await createdTask.$set('user', userId);

    return createdTask;
  }

  async getAll(userId: number) {
    return await this.tasksRepository.findAll({
      where: { userId },
      include: { all: true },
    });
  }

  async getById(id: number, userId: number) {
    const task = await this.tasksRepository.findOne({
      where: { id, userId },
      include: { all: true },
    });

    if (!task) {
      throw new HttpException(
        'Task with current id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return task;
  }

  async updateTask(id: number, dto: CreateTaskDto, userId: number) {
    const task = await this.getById(id, userId);

    if (!task) {
      throw new HttpException(
        'Task with current id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const { labels, ...data } = dto;
    await task.update(data);

    if (labels) {
      await task.$set('labels', labels);
    }

    return task;
  }

  async deleteTask(id: number, userId: number) {
    const task = await this.getById(id, userId);

    if (!task) {
      throw new HttpException(
        'Task with current id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return await task.destroy();
  }
}
