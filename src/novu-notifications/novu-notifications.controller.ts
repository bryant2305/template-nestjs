import {
  Controller,
  Get,
  Query,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { NovuNotificationsService } from './novu-notifications.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/jwt-auth-guard';

@Controller('novu-notifications')
export class NovuNotificationsController {
  constructor(
    private readonly novuNotificationsService: NovuNotificationsService,
  ) {}

  @ApiTags('notify-me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('send')
  async sendNotification(@Request() req: any) {
    const userId = req.user.id;
    return this.novuNotificationsService.sendNotification(userId);
  }
}
