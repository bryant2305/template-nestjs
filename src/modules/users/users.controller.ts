import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/upload.config';
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

  @Get('user')
  @ApiOperation({ summary: 'get a user' })
  // @ApiBearerAuth()
  // @UseGuards(JwtGuard, AdminGuard)
  findOneUser(userId: number) {
    return this.usersService.getUserById(userId);
  }
}
