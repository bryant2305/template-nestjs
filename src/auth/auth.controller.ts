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
import { multerOptions } from 'src/config/upload.config';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'login' })
  @ApiResponse({ status: 201, description: 'logeado!' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'register' })
  @ApiResponse({ status: 201, description: 'registrado!' })
  @UseInterceptors(FileInterceptor('profileImage', multerOptions))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUserDto })
  register(
    @Body() registerDto: CreateUserDto,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    return this.authService.register(registerDto, profileImage);
  }
}
