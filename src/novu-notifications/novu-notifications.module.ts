import { Module } from '@nestjs/common';
import { NovuNotificationsService } from './novu-notifications.service';
import { NovuNotificationsController } from './novu-notifications.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { UtilsService } from 'src/utils/utils.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule],
  controllers: [NovuNotificationsController],
  providers: [NovuNotificationsService, UtilsService],
})
export class NovuNotificationsModule {}
