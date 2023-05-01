import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private rolesRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const role = await this.rolesRepository.findOne({
      where: { value: dto.value },
    });
    if (role) {
      throw new HttpException(
        'Role with current name has already created',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.rolesRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });

    if (!role) {
      throw new HttpException(
        'Role with current value not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return role;
  }

  async getAll() {
    return await this.rolesRepository.findAll();
  }
}
