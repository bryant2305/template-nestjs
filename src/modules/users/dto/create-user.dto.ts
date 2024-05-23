import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'Damaris@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'Damaris' })
  @IsNotEmpty()
  Name: string;

  @IsString()
  @ApiProperty({ example: 'Encarnacion' })
  @IsNotEmpty()
  LastName: string;

  @IsString()
  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  password: string;

  @IsString()
  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  passwordConfirmation: string;
}
