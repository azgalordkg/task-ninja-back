import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RolesDecorator } from '../../decorators/role-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { UserDecorator } from '../../decorators/user.decorator';
import { EditUserDto } from './dto/edit-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'User creation' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'User editing' })
  @ApiResponse({ status: 200, type: User })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Put()
  edit(@Body() dto: EditUserDto, @UserDecorator() user: User) {
    return this.usersService.editUser(dto, user.id);
  }

  @ApiOperation({ summary: 'User deletion' })
  @ApiResponse({ status: 200, type: HttpException })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Delete()
  delete(@UserDecorator() user: User) {
    return this.usersService.deleteUser(user.id);
  }

  @ApiOperation({ summary: 'User deletion by Admin' })
  @ApiResponse({ status: 200, type: HttpException })
  @RolesDecorator('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Delete('/:id')
  deleteByAdmin(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
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
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.usersService.getById(id);
  }

  @ApiOperation({ summary: 'User by email' })
  @ApiResponse({ status: 200, type: User })
  @RolesDecorator('USER')
  @UseGuards(RolesAuthGuard)
  @Get('/:email')
  getByEmail(@Param('email') email: string) {
    return this.usersService.getByEmail(email);
  }
}
