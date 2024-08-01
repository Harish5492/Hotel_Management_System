import { Tests, PatientTestRecord } from '../../common/database/entities';
import { TEST_REPOSITORY } from 'src/constant';
import { PATIENT_TEST_REPOSITORY } from 'src/constant';

export const testProvider = [
  {
    provide: TEST_REPOSITORY,
    useValue: Tests,
  },
  {
    provide: PATIENT_TEST_REPOSITORY,
    useValue: PatientTestRecord,
  },
];
