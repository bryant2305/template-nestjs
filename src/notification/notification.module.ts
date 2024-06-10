import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { FirebaseMessagingService } from 'src/firebase/firebase-messaging.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [NotificationController],
  providers: [NotificationService, FirebaseMessagingService],
})
export class NotificationModule {}
