import { User } from '../../common/database/entities/user.entity';
import { USER_REPOSITORY } from 'src/constant';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
