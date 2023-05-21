import { Twilio } from 'twilio';

class TwilioService {
  client: Twilio;
  constructor() {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    );
  }

  sendMessage = async (phoneNumber: string, otp: string) => {
    return await this.client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
      body: `Here is your NearBye login code: ${otp}`,
    });
  };
}

export default new TwilioService();
