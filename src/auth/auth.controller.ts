import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryConfig } from 'src/config/cloudinary.config';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinaryConfig: CloudinaryConfig,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: 201, description: 'logeado!' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'register' })
  @ApiResponse({ status: 201, description: 'registrado!' })
  @UseInterceptors(FileInterceptor('profileImage'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDto })
  async register(
    @Body() registerDto: CreateUserDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    const imageUrl = await this.cloudinaryConfig.uploadImage(profileImage);
    return this.authService.register(registerDto, imageUrl);
  }
}
