import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';
import { AdminGuard } from 'src/auth/admin-guard';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard, AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @UseGuards(JwtGuard, AdminGuard)
  findOne(@Param('id') userId: number) {
    return this.usersService.getUserById(userId);
  }
}
