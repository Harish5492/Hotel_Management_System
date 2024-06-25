import { Test } from '../../common/database/entities/test.entity';
import { TEST_REPOSITORY } from 'src/constant';

export const testProvider = [
  {
    provide: TEST_REPOSITORY,
    useValue: Test,
  },
];
