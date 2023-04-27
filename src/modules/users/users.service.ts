import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto, roleName?: string) {
    const user = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (user) {
      throw new HttpException(
        'User has already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = await this.usersRepository.create(dto);
    const role = await this.rolesService.getRoleByValue(roleName || 'USER');
    await newUser.$set('roles', [role.id]);
    newUser.roles = [role];
    return newUser;
  }

  async getAll() {
    return await this.usersRepository.findAll({
      include: { all: true },
    });
  }

  async getById(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      include: { all: true },
    });
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async createAdminRole() {
    const adminRoleName = 'ADMIN';
    const adminRole = await this.rolesService.getRoleByValue(adminRoleName);

    if (!adminRole) {
      await this.rolesService.createRole({
        value: adminRoleName,
        description: 'Administrator role',
      });
    }
  }
}
