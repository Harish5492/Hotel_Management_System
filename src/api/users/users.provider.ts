import { Otp } from 'src/database/entities';
import { User } from '../../database/entities/user.entity';
import { OTP_REPOSITORY, USER_REPOSITORY } from 'src/constant';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: OTP_REPOSITORY,
    useValue: Otp,
  },
];
