import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  public validateNumber(phoneNumber: string): string {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `+1(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return null;
  }
}
