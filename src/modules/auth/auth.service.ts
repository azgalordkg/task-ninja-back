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

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateService(userDto: CreateUserDto) {
    const user = await this.usersService.getByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Email or password is not correct',
    });
  }

  async login(dto: CreateUserDto) {
    const user = await this.validateService(dto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto, role?: string) {
    const candidate = await this.usersService.getByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'User is already registered',
        HttpStatus.BAD_REQUEST,
      );
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
