import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateService(userDto: CreateUserDto) {
    const user = await this.usersService.getByEmail(userDto.email);
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (!passwordEquals) {
      throw new UnauthorizedException({
        message: 'INVALID_EMAIL_OR_PASSWORD',
      });
    }
    return user;
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateService(dto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto, role?: string) {
    const candidate = await this.usersService.getByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser(
      {
        ...userDto,
        password: hashPassword,
      },
      role,
    );

    return this.generateToken(user);
  }

  async getUserInfo(id: number) {
    const user = await this.usersService.getById(id);
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async createAdminUser() {
    const adminRoleName = 'ADMIN';

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    const adminUser = await this.usersService.getByEmail(adminEmail);

    if (!adminUser) {
      await this.registration(
        {
          email: adminEmail,
          password: adminPassword,
        },
        adminRoleName,
      );
    }
  }
}
