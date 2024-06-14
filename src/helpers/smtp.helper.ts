// import nodemailer from 'nodemailer';

// class EmailService {
//   private transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'rana5492@gmail.com', // Your email address
//         pass: 'Harish@5492', // Your email password or app password
//       },
//     });
//   }

//   //   public async sendMail() {
//   //     const mailOptions = {
//   //       from: 'rana5492@gmail.com', // Sender address
//   //       to: 'harishrana5492@gmail.com', // List of receivers
//   //       subject: 'Hello from Nodemailer', // Subject line
//   //       text: 'Hello world!', // Plain text body
//   //       html: '<b>Hello world!</b>', // HTML body
//   //     };
//   public async sendMail() {
//     // html: string, // text: string, // subject: string, // to: string,
//     const mailOptions = {
//       from: 'rana5492@gmail.com', // Sender address
//       to: 'harishrana5492@gmail.com', // List of receivers
//       subject: 'Hello from Nodemailer', // Subject line
//       text: 'Hello world!', // Plain text body
//       html: '<b>Hello world!</b>', // HTML body
//     };

//     try {
//       const info = await this.transporter.sendMail(mailOptions);
//       console.log('Email sent: ' + info.response);
//     } catch (error) {
//       console.error('Error sending email: ', error);
//     }
//   }
// }

// export default new EmailService();
