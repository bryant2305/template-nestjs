import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

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
  register(@Body() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }
}
