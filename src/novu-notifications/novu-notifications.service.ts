import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Novu } from '@novu/node';
import { Profile } from 'src/modules/users/entities/profile.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { UtilsService } from 'src/utils/utils.service';
import { Repository } from 'typeorm';

@Injectable()
export class NovuNotificationsService {
  private readonly novu: Novu;

  constructor(
    private readonly userService: UsersService,
    private readonly utilsService: UtilsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.novu = new Novu(process.env.NOVU_API_KEY);
  }

  async sendNotification(userId: number) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      const profile = user.profile;
      if (!profile) {
        throw new Error(`Profile for user with ID ${userId} not found`);
      }
      const email = user.email;
      if (!email) {
        throw new Error(`email not found`);
      }

      const formattedPhoneNumber = this.utilsService.validateNumber(
        profile.phone,
      );

      const response = await this.novu.trigger('demo-verify-otp', {
        to: {
          subscriberId: '66a92b6740ba3217721d2dde',
          email: email,
          phone: formattedPhoneNumber,
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
      throw error;
    }
  }
}
