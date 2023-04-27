import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Auth } from './entities/auth.entity';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    type: Auth,
  })
  @Post('/login')
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({
    status: 200,
    type: Auth,
  })
  @Post('/register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.registration(dto);
  }
}
