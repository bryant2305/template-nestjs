import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'Damaris@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'Damaris' })
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'Encarnacion' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '200' })
  @IsNotEmpty()
  weight: number;

  @ApiProperty({ example: '180' })
  @IsNotEmpty()
  height: number;

  @IsString()
  @ApiProperty({ example: 'weight loss' })
  @IsNotEmpty()
  health_goal: string;

  @IsString()
  @ApiProperty({ example: 'low' })
  @IsNotEmpty()
  activity_level: string;

  @IsString()
  @ApiProperty({ example: 'Admin' })
  @IsNotEmpty()
  passwordConfirmation: string;

  @IsOptional()
  @ApiProperty({ type: 'string', format: 'binary' })
  profileImage: string;
}
