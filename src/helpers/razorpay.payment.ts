import Razorpay from 'razorpay'; // Correct import for Razorpay module
import crypto from 'crypto'; // Assuming crypto-js is needed elsewhere
import { EM, MESSAGES } from 'src/constant';
import { throwError } from './responseHadnlers';

class RazorpayPayment {
  private RAZORPAY_KEY_SECRET: string = EM.RAZORPAY.RAZORPAY_KEY_SECRET;
  private razorpayInstance: Razorpay;

  constructor() {
    // Create a new Razorpay instance with your API keys
    this.razorpayInstance = new Razorpay({
      key_id: EM.RAZORPAY.RAZORPAY_KEY_ID,
      key_secret: EM.RAZORPAY.RAZORPAY_KEY_SECRET,
    });
  }

  razorpayPaymentCreate = async (amount: number) => {
    try {
      const options = {
        amount: Number(amount) * 100, // Convert to smallest currency unit (paisa for INR)
        currency: 'INR',
        receipt: 'receipt_' + Math.random().toString(36).substring(7), // Unique receipt ID
      };

      // Create an order using the Razorpay instance
      const order = await this.razorpayInstance.orders.create(options);
      console.log(order);
      return order;
    } catch (err) {
      console.error('Error occurred:', err);
      throwError(MESSAGES.ERROR.RAZORPAY_PAYMENT_FAILED);
    }
  };

  razorpayPaymentVerification = async (
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string,
  ) => {
    try {
      const sign = razorpay_order_id + '|' + razorpay_payment_id;
      console.log('Sign String:', sign);

      const expectedSign = crypto
        .createHmac('sha256', this.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest('hex');

      console.log('Expected Signature:', expectedSign);
      console.log('Received Signature:', razorpay_signature);

      if (razorpay_signature === expectedSign) {
        console.log('Payment verified successfully');
      } else {
        console.log('Invalid payment signature');
      }
    } catch (error) {
      console.log(error);
      throwError(MESSAGES.ERROR.RAZORPAY_PAYMENT_FAILED);
    }
  };
}

export default new RazorpayPayment();
