import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import * as admin from 'firebase-admin';

interface NotificationWithImage extends admin.messaging.Notification {
  image?: string;
}

@Injectable()
export class FirebaseMessagingService {
  private readonly messaging: admin.messaging.Messaging;

  constructor(private readonly firebaseService: FirebaseService) {
    this.messaging = this.firebaseService.getAdmin().messaging();
  }

  async sendPushNotifications({
    tokens,
    title,
    body,
    data,
  }: {
    tokens: string[];
    title: string;
    body: string;
    data?: object;
  }) {
    const message: admin.messaging.MulticastMessage = {
      notification: {
        title,
        body,
        // eslint-disable-next-line prettier/prettier
        image: 'https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-1024.png',
      } as NotificationWithImage,
      data: {
        title,
        body,
        image:
          'https://cdn4.iconfinder.com/data/icons/google-i-o-2016/512/google_firebase-2-1024.png',
        ...data,
      },
      tokens,
    };

    try {
      const response = await this.messaging.sendEachForMulticast(message);
      return {
        error: false,
        success: response.successCount,
        failure: response.failureCount,
        message: null,
      };
    } catch (error) {
      console.error('Error sending notifications:', error);
      return {
        error: true,
        success: 0,
        failure: tokens.length,
        message: error.message,
      };
    }
  }
}
