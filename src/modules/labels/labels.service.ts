import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';

@Injectable()
export class LabelsService {
  constructor(@InjectModel(Label) private labelsRepository: typeof Label) {}

  async createLabel(dto: CreateLabelDto) {
    const label = await this.labelsRepository.findOne({
      where: { name: dto.name },
    });

    if (label) {
      throw new HttpException(
        'Label with current name has already created',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.labelsRepository.create(dto);
  }

  async updateLabel(id: number, dto: CreateLabelDto) {
    const label = await this.labelsRepository.findByPk(id);

    if (!label) {
      throw new HttpException(
        'Label with current id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return await label.update(dto);
  }

  async deleteLabel(id: number) {
    const label = await this.labelsRepository.findByPk(id);

    if (!label) {
      throw new HttpException(
        'Label with current id not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return await label.destroy();
  }

  async getLabelById(id: number) {
    const label = await this.labelsRepository.findOne({
      where: { id },
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

  async getAll() {
    return await this.labelsRepository.findAll();
  }
}
