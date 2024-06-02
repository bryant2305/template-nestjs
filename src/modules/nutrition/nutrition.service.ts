// src/nutrition/nutrition.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class NutritionService {
  private readonly apiKey: string;
  private readonly appId: string;
  private url: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('NUTRITIONIX_API_KEY');
    this.appId = this.configService.get<string>('NUTRITIONIX_APP_ID');
  }

  getNutritionData(food: string) {
    const url = (this.url = this.configService.get<string>('NUTRITION_URL'));
    const headers = {
      'x-app-id': this.appId,
      'x-app-key': this.apiKey,
      'Content-Type': 'application/json',
    };
    const body = { query: food };

    return this.httpService
      .post(url, body, { headers })
      .pipe(map((response) => response.data));
  }
}
