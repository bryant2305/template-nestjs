import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './users-event';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
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
          phone: createUserDto.phone,
          profileImage: createUserDto.profileImage,
        },
      };
      const savedUser = await this.userRepository.save(createUser);

      // Emitir evento de usuario creado
      this.eventEmitter.emit(
        'user.created',
        new UserCreatedEvent(savedUser.id),
      );

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
  // En tu servicio de usuarios
  async getUserById(userId: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: userId } });
  }
}
