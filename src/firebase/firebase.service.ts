// src/firebase/firebase.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly admin;

  constructor(private readonly configService: ConfigService) {
    this.admin = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: this.configService
          .get<string>('FIREBASE_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
      }),
      // databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }

  getAdmin() {
    return this.admin;
  }
}
