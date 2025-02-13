import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { AuthGuard } from './auth-guard-token';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly authGuard: AuthGuard,
    private readonly jwtStrategy: JwtStrategy,
    private readonly jwtService: JwtService, // I
  ) {}

  async register(registerDto: CreateUserDto, imageUrl: string) {
    try {
      const { email, password, passwordConfirmation } = registerDto;

      const existingUser = await this.userService.findOneByEmail(email);
      if (existingUser) {
        throw new HttpException('Este usuario ya existe', 404);
      }

      if (password !== passwordConfirmation) {
        throw new HttpException(
          'password and password confirmation must be the same',
          400,
        );
      }

      const hashedPassword = await this.userService.hashPassword(password);
      const newUser = await this.userService.create({
        ...registerDto,
        password: hashedPassword,
        passwordConfirmation: hashedPassword,
        profileImage: imageUrl,
      });

      // Genera el token
      const payload = { id: newUser.id, email: newUser.email };
      const token = this.jwtService.sign(payload);

      return { user: newUser, token };
    } catch (error) {
      console.error('Error in register:', error); // Logging the error for debugging
      throw new HttpException(
        error.message || 'Error during registration',
        500,
      );
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new HttpException('Credenciales invalidas', 404);
    }
    const isPasswordValid = await this.userService.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Credenciales invalidas', 404);
    }
    const userWithoutPassword = plainToClass(User, user);

    // Genera el token
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { user: userWithoutPassword, token };
  }
}
