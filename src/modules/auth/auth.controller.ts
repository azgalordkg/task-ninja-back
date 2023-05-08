import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from './entities/auth.entity';
import { UserDecorator } from '../../decorators/user.decorator';
import { User } from '../users/entities/user.entity';
import { RolesDecorator } from '../../decorators/role-auth.decorator';
import { RolesAuthGuard } from './roles-auth.guard';
import { AuthGuard } from '@nestjs/passport';

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

  @ApiOperation({ summary: 'Get Me' })
  @ApiResponse({ status: 200, type: Auth })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get('/me')
  getUserById(@UserDecorator() user: User) {
    return this.authService.getUserInfo(user.id);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
