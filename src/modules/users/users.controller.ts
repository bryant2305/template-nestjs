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

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create User',
    type: CreateUserDto,
  })
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    const result = await this.usersService.create(createUserDto, profileImage);
    return result;
  }

  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  findAll() {
    return this.usersService.findAll();
  }
}
