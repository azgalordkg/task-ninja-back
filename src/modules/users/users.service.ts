import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private usersRepository: typeof User,
    private rolesServices: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { login: dto.login },
    });
    if (user) {
      throw new HttpException(
        'User has already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newUser = await this.usersRepository.create(dto);
    const role = await this.rolesServices.getRoleByValue('USER');
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

  async getByLogin(login: string) {
    return await this.usersRepository.findOne({
      where: { login },
      include: { all: true },
    });
  }
}
