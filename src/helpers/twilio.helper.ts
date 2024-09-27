import twilio from 'twilio';
import { EM } from '../constant';

class TwilioHelper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private client: any; // You may want to provide a specific type for the Twilio client.

  constructor() {
    const accountSid = EM.TWILIO.ACCOUNTSID;
    const authToken = EM.TWILIO.AUTHTOKEN;
    this.client = twilio(accountSid, authToken);
  }
  // Adjust the function definition to accept an options object
  async sendMessage(options: {
    to: string;
    otp: string | number;
  }): Promise<void> {
    const { otp } = options; // Destructure options object to get to and otp

    try {
      const message = await this.client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+12182280015',
        to: '+918872512811',
      });
      console.log('Message sent. SID:', message.sid);
    } catch (error) {
      console.log('Error:', error);
    }
  }
}

export default new TwilioHelper();
