import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { FirebaseMessagingService } from 'src/firebase/firebase-messaging.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly firebaseService: FirebaseMessagingService) {}

  @Post()
  sendNotification(@Body() pushNotification: CreateNotificationDto) {
    this.firebaseService.sendPushNotifications(pushNotification);
  }
}
