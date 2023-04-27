import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesDecorator } from '../auth/role-auth.decorator';
import { RolesAuthGuard } from '../auth/roles-auth.guard';
import { Role } from './entities/role.entity';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: 'Role creation' })
  @ApiResponse({ status: 200, type: Role })
  @RolesDecorator('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Post()
  createRole(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @ApiOperation({ summary: 'Getting role by value' })
  @ApiResponse({ status: 200, type: Role })
  @RolesDecorator('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get('/:value')
  getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }

  @ApiOperation({ summary: 'Getting all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @RolesDecorator('ADMIN')
  @UseGuards(RolesAuthGuard)
  @Get()
  getAll() {
    return this.rolesService.getAll();
  }
}
