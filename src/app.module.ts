import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import typeorm from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { RegisterFoodModule } from './modules/register-food/register-food.module';
import { RegisterFoodDetailModule } from './modules/register-food-detail/register-food-detail.module';
import { NutritionModule } from './modules/nutrition/nutrition.module';
import { FirebaseModule } from './firebase/firebase.module';
import { NotificationModule } from './notification/notification.module';
import { RolesModule } from './modules/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    // AuthModule,
    UsersModule,
    AuthModule,
    RegisterFoodModule,
    RegisterFoodDetailModule,
    NutritionModule,
    FirebaseModule,
    NotificationModule,
    RolesModule,
    // EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
