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
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private readonly googleClient: OAuth2Client;

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    const clientId = process.env.GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID';
    this.googleClient = new OAuth2Client(clientId);
  }

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

  private async verifyToken(token: string) {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: token,
        audience: this.googleClient._clientId,
      });
      return ticket.getPayload();
    } catch (error) {
      throw new HttpException('GOOGLE_AUTH_ERROR', HttpStatus.BAD_REQUEST);
    }
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

    const name = userDto?.fullname || userDto?.email.split('@')[0];
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser(
      {
        ...userDto,
        password: hashPassword,
        fullname: name,
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

  async registerWithGoogle(token: string) {
    const googleAccountInfo = await this.verifyToken(token);
    const { email, family_name, name } = googleAccountInfo;
    let user = await this.usersService.getByEmail(email);

    if (!user) {
      user = await this.usersService.createGoogleUser({
        email,
        isGoogle: true,
        fullname: `${name} ${family_name}`,
      });
    }

    return this.generateToken(user);
  }
}
