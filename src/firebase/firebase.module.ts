import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase.service';
import { FirebaseMessagingService } from './firebase-messaging.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [FirebaseMessagingService, FirebaseService],
  exports: [FirebaseMessagingService, FirebaseService],
})
export class FirebaseModule {}
