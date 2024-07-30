import { Module } from '@nestjs/common';
import { NovuNotificationsService } from './novu-notifications.service';
import { NovuNotificationsController } from './novu-notifications.controller';
import { UsersModule } from 'src/modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [NovuNotificationsController],
  providers: [NovuNotificationsService],
})
export class NovuNotificationsModule {}
