import Razorpay from 'razorpay'; // Correct import for Razorpay module
import crypto from 'crypto-js'; // Assuming crypto-js is needed elsewhere
import { EM } from 'src/constant';

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

  razorpayPaymentCreate = async (amount: string) => {
    try {
      const options = {
        amount: parseInt(amount) * 100, // Convert to smallest currency unit (paisa for INR)
        currency: 'INR',
        receipt: 'receipt_' + Math.random().toString(36).substring(7), // Unique receipt ID
      };

      // Create an order using the Razorpay instance
      const order = await this.razorpayInstance.orders.create(options);
      console.log(order);
      return order;
    } catch (err) {
      console.error('Error occurred:', err);
      throw 'Sorry, an error occurred while creating the payment';
    }
  };

  //   razorpayPaymentVerification = async (
  //     razorpay_order_id,
  //     razorpay_payment_id,
  //     razorpay_signature,
  //   ) => {};
}

export default new RazorpayPayment();
