import { Controller, Get } from '@nestjs/common';
import { NovuNotificationsService } from './novu-notifications.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('novu-notifications')
export class NovuNotificationsController {
  constructor(
    private readonly novuNotificationsService: NovuNotificationsService,
  ) {}

  @ApiTags('notify-me')
  @Get('send')
  async sendNotification(userId: number) {
    return this.novuNotificationsService.sendNotification(userId);
  }
}
