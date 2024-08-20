import { Ambulance, ServiceFacility } from '../../common/database/entities';
import {
  AMBULANCE_REPOSITORY,
  SERVICE_FACILITY_REPOSITORY,
} from 'src/constant';

export const ManagementProvider = [
  {
    provide: AMBULANCE_REPOSITORY,
    useValue: Ambulance,
  },
  {
    provide: SERVICE_FACILITY_REPOSITORY,
    useValue: ServiceFacility,
  },
];
