import { Injectable } from '@nestjs/common';
import { Novu } from '@novu/node';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class NovuNotificationsService {
  private readonly novu: Novu;
  private readonly userService: UsersService;

  constructor(userService: UsersService) {
    this.novu = new Novu('f8c1b4dfac24cef58de22e32abc78d30');
    this.userService = userService;
  }

  async sendNotification(userId: number) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      //const subscriberId = user.id.toString();

      const response = this.novu.trigger('demo-verify-otp', {
        to: {
          subscriberId: '66a92b6740ba3217721d2dde',
          email: 'bryantperezgarcia005@gmail.com',
          phone: '+1(829) 432-2305',
        },
        payload: {
          validationCode: 123456,
          magicLinkURL: 'https://slack.com/magic/link',
          __source: 'studio-test-workflow',
        },
      });

      return response;
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }
}
