import { Injectable } from '@nestjs/common';
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

  async getById(id: number) {
    return await this.tasksRepository.findByPk(id, { include: { all: true } });
  }

  async deleteTask(id: number) {
    const task = await this.getById(id);
    return await task.destroy();
  }

  async updateTask(id: number, dto: CreateTaskDto) {
    const task = await this.getById(id);
    const { labels, ...data } = dto;
    await task.update(data);

    if (labels) {
      await task.$set('labels', labels);
    }

    return task;
  }
}
