import * as twilio from 'twilio';

class TwilioHelper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private client: any; // You may want to provide a specific type for the Twilio client.

  constructor() {
    const accountSid = 'AC4c167fc67bd899ac6ab911d41ef14e90';
    const authToken = 'c0f98fccc3186ac2cbbfe6640aaabfdf';
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
