import {
  DataType,
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Patient from './user.entity';

@Table
export class ServiceFacility extends Model<ServiceFacility> {
  @Column({
    type: DataType.ENUM('WHEELCHAIR', 'BED'),
    allowNull: false,
  })
  serviceType: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  facilityNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  facilityType: string; // Type of wheelchair or bed

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  availabilityStatus: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  conditionStatus: string; // Status of the facility (e.g., good, needs repair)

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  assignedPatientId: string;

  @BelongsTo(() => Patient, { as: 'patient' })
  assignedPatient: Patient;
}

export default ServiceFacility;
