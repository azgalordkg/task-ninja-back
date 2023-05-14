import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from './entities/auth.entity';
import { UserDecorator } from '../../decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { RolesDecorator } from '../../decorators/role-auth.decorator';
import { RolesAuthGuard } from './roles-auth.guard';
import { GoogleRegisterDto } from './dto/google-register.dto';
import { EditUserDto } from '../users/dto/edit-user.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: Auth })
  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200, type: Auth })
  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }

  @ApiOperation({ summary: 'Set Password' })
  @ApiResponse({ status: 200, type: HttpException })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Post('/password/set')
  setPassword(@Body() dto: EditUserDto, @UserDecorator() user: User) {
    return this.authService.setPassword(user.id, dto.password);
  }

  @ApiOperation({ summary: 'Change Password' })
  @ApiResponse({ status: 200, type: HttpException })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Post('/password/change')
  changePassword(@Body() dto: EditUserDto, @UserDecorator() user: User) {
    return this.authService.changePassword(
      user.id,
      dto.oldPassword,
      dto.password,
    );
  }

  @ApiOperation({ summary: 'Get Me' })
  @ApiResponse({ status: 200, type: Auth })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get('/me')
  getUserById(@UserDecorator() user: User) {
    return this.authService.getUserInfo(user.id);
  }

  @ApiOperation({ summary: 'Google Registration' })
  @ApiResponse({ status: 200, type: Auth })
  @Post('/google')
  async signInWithGoogle(@Body() { token }: GoogleRegisterDto) {
    return await this.authService.registerWithGoogle(token);
  }
}
