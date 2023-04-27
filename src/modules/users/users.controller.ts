import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RolesDecorator } from '../auth/role-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @RolesDecorator('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Users list' })
  @ApiResponse({ status: 200, type: [User] })
  @RolesDecorator('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @ApiOperation({ summary: 'User by ID' })
  @ApiResponse({ status: 200, type: User })
  @RolesDecorator('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }

  @ApiOperation({ summary: 'User by login' })
  @ApiResponse({ status: 200, type: User })
  @RolesDecorator('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get('/:login')
  getByLogin(@Param('login') login: string) {
    return this.usersService.getByLogin(login);
  }
}
