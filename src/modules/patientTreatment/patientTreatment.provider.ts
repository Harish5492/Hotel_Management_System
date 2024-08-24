import { Appointment, Treatment } from '../../common/database/entities/index';
import { APPOINTMENTS_REPOSITORY, TREATMENT_REPOSITORY } from 'src/constant';

export const patientProvider = [
  {
    provide: TREATMENT_REPOSITORY,
    useValue: Treatment,
  },

  {
    provide: APPOINTMENTS_REPOSITORY,
    useValue: Appointment,
  },
];
