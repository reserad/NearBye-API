import { Twilio } from "twilio";

class TwilioService {
    client: Twilio;
    constructor() {
        this.client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }

    sendMessage = async (phoneNumber: string) => {
        const response = await this.client.messages.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber,
            body: 'howdy dude'
        });
    }
}

export default new TwilioService();