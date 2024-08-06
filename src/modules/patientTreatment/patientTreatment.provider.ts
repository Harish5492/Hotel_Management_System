import { Treatment } from '../../common/database/entities/index';
import { TREATMENT_REPOSITORY } from 'src/constant';

export const patientProvider = [
  {
    provide: TREATMENT_REPOSITORY,
    useValue: Treatment,
  },
];
