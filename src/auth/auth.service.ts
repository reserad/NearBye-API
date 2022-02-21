import { Injectable } from '@nestjs/common';
import twilioService from 'src/twilio/twilioService';

@Injectable()
export class AuthService {
  async sendMagicLink(phoneNumber: string) {
    // await twilioService.sendMessage(phoneNumber);
  }
}
