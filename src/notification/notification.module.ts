import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { FirebaseMessagingService } from 'src/firebase/firebase-messaging.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [NotificationController],
  providers: [FirebaseMessagingService, FirebaseService],
})
export class NotificationModule {}
