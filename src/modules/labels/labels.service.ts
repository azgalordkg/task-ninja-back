import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';

@Injectable()
export class LabelsService {
  constructor(@InjectModel(Label) private labelsRepository: typeof Label) {}

  async createLabel(dto: CreateLabelDto, userId: number) {
    const label = await this.labelsRepository.findOne({
      where: { name: dto.name },
    });

    if (label) {
      throw new HttpException(
        'Label with current name has already created',
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdLabel = await this.labelsRepository.create({ ...dto, userId });
    await createdLabel.$set('user', userId);

    return createdLabel;
  }

  async updateLabel(id: number, dto: CreateLabelDto, userId: number) {
    const label = await this.labelsRepository.findOne({
      where: { id, userId },
    });

    if (!label) {
      throw new HttpException(
        'Label with current id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return await label.update(dto);
  }

  async deleteLabel(id: number, userId: number) {
    const label = await this.labelsRepository.findOne({
      where: { id, userId },
    });

    if (!label) {
      throw new HttpException(
        'Label with current id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return await label.destroy();
  }

  async getLabelById(id: number, userId: number) {
    const label = await this.labelsRepository.findOne({
      where: { id, userId },
      include: { all: true },
    });

    if (!label) {
      throw new HttpException(
        'Label with current id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return label;
  }

  async getAll(userId: number) {
    return await this.labelsRepository.findAll({ where: { userId } });
  }
}
