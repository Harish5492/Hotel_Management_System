import { Otp } from '../../database/entities/otp.entity'; // Adjust the path as needed
import { Provider } from '@nestjs/common';
import { OTP_REPOSITORY } from 'src/constant';

export const otpProviders: Provider[] = [
  {
    provide: OTP_REPOSITORY,
    useValue: Otp,
  },
];
