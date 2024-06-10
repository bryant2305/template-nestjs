import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class DataDTO {}

export class CreateNotificationDto {
  @ApiProperty({
    description: 'Array of tokens to send the notification to',
    example: [
      'cglPEEf98mojkHNl5pofhg:APA91bE7bVg8L7d5c-9TwZHP_pKaQdbSGrDj4sHJigF1h2vLKEesju4vM_YW3NM3HrT9f-ftYj3EQnZe__sUhJrCOu8iZq4JDQfP8NIn_dtHTzgepzpQdsyzJaFEr6YVGejA6CVC8b0R',
    ],
  })
  @IsArray()
  @IsString({ each: true })
  tokens: string[];

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => DataDTO)
  data?: DataDTO;
}
