// src/notification/notification.service.ts
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FirebaseMessagingService } from '../firebase/firebase-messaging.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly firebaseMessagingService: FirebaseMessagingService,
  ) {}

  async send(createNotificationDto: CreateNotificationDto) {
    const { tokens, title, body, data } = createNotificationDto;
    return this.firebaseMessagingService.sendPushNotifications({
      tokens,
      title,
      body,
      data,
    });
  }
}
