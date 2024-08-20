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
export class Ambulance extends Model<Ambulance> {
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  ambulanceNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  driverName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  driverContact: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: true,
  })
  availabilityStatus: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  serviceArea: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  costPerTrip: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  lastServiceDate: Date;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  assignedPatientId: string;

  @BelongsTo(() => Patient, { as: 'assignedPatient' })
  assignedPatient: Patient;
}

export default Ambulance;
