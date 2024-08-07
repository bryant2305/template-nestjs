import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Novu } from '@novu/node';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';
import { UtilsService } from 'src/utils/utils.service';
import { Repository } from 'typeorm';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/modules/users/users-event';

@Injectable()
export class NovuNotificationsService implements OnModuleInit {
  private readonly novu: Novu;

  constructor(
    private readonly userService: UsersService,
    private readonly utilsService: UtilsService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.novu = new Novu(process.env.NOVU_API_KEY);
  }

  onModuleInit() {
    this.eventEmitter.on('user.created', async (event: UserCreatedEvent) => {
      await this.sendNotification(event.userId);
    });
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
          subscriberId: '66b38f8faa4218d126b20170',
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
