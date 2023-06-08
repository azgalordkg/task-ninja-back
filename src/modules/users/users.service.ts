import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { CreateGoogleUserDto } from './dto/create-google-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

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

    const newUser = await this.usersRepository.create({
      ...dto,
      withPassword: true,
    });
    const role = await this.rolesService.getRoleByValue(roleName || 'USER');
    await newUser.$set('roles', [role.id]);
    newUser.roles = [role];
    return newUser;
  }

  async editUser(dto: EditUserDto, userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await user.update(dto);
  }

  async deleteUser(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await user.destroy();
    return new HttpException('User deleted successfully', HttpStatus.OK);
  }

  async createGoogleUser(dto: CreateGoogleUserDto) {
    const newUser = await this.usersRepository.create({
      ...dto,
      withPassword: false,
    });
    const role = await this.rolesService.getRoleByValue('USER');
    await newUser.$set('roles', [role.id]);
    newUser.roles = [role];
    return newUser;
  }

  async getAll() {
    return await this.usersRepository.findAll({
      include: { all: true },
    });
  }

  async getById(id: number, withPassword = false) {
    return await this.usersRepository.findOne({
      where: { id },
      attributes: withPassword
        ? undefined
        : {
            exclude: ['password'],
          },
      include: { all: true },
    });
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }

  async createAdminAndUserRoles() {
    const adminRoleName = 'ADMIN';
    const userRoleName = 'USER';

    const adminRole = await this.rolesService.getRoleByValue(adminRoleName);
    const userRole = await this.rolesService.getRoleByValue(userRoleName);

    if (!adminRole) {
      await this.rolesService.createRole({
        value: adminRoleName,
        description: 'Administrator role',
      });
    }

    if (!userRole) {
      await this.rolesService.createRole({
        value: userRoleName,
        description: 'User role',
      });
    }
  }
}
