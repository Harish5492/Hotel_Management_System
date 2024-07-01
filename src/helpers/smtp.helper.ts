import * as nodemailer from 'nodemailer';
import { EM } from '../constant';
class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = this.initSmtp();
  }
  private initSmtp(): nodemailer.Transporter {
    const smtpConfig = {
      host: 'sandbox.smtp.mailtrap.io', // Replace with your SMTP server host
      port: 2525, // Replace with the appropriate port
      secure: false, // Set to true if you are using SSL/TLS
      auth: {
        user: EM.MAILTRAP.USERNAME,
        pass: EM.MAILTRAP.PASSWORD,
      },
    };

    return nodemailer.createTransport(smtpConfig);
  }

  public async sendMail(to: string, otp: string | number) {
    // Fixed parenthesis
    const mailOptions = {
      from: '',
      to: 'harishrana5492@gmail.com', // List of receivers
      subject: 'Hello from Nodemailer', // Subject line
      text: `Your OTP is ${otp}`, // Plain text body
      html: `<b>Your OTP is ${otp}</b>`, // HTML body
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }
}

export default new EmailService();
