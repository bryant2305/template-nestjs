import { Module } from '@nestjs/common';
import { AlimentService } from './aliment.service';
import { AlimentController } from './aliment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aliment } from './entities/aliment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aliment])],
  controllers: [AlimentController],
  providers: [AlimentService],
})
export class AlimentModule {}
