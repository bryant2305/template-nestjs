import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    profileImage: Express.Multer.File,
  ): Promise<Partial<User>> {
    const found = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (found) {
      throw new HttpException('Ya existe un usuario con este correo', 500);
    }

    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new HttpException(
        'password and password confirmation must be the same',
        400,
      );
    }
    try {
      const createUser: any = {
        ...createUserDto,
        profile: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          activity_level: createUserDto.activity_level,
          health_goal: createUserDto.health_goal,
          weight: createUserDto.weight,
          height: createUserDto.height,
          profileImage: profileImage.path,
        },
      };
      await this.userRepository.save(createUser);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, passwordConfirmation, ...userResponse } = createUserDto;

      return userResponse;
    } catch (error) {
      throw new HttpException('Error al crear el usuario', 500);
    }
  }

  async comparePasswords(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findAll() {
    return this.userRepository.find();
  }
}
