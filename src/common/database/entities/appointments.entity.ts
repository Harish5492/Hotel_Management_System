import {
  DataType,
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.entity';

@Table
export class Appointment extends Model<Appointment> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  patientId: string;

  @BelongsTo(() => User, { as: 'patient' })
  patient: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  patientEmail: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  doctorId: string;

  @BelongsTo(() => User, { as: 'doctor' })
  doctor: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  doctorEmail: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  appointmentDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  appointmentTime: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  reason: string;

  @Column({
    type: DataType.ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'),
    defaultValue: 'PENDING',
    allowNull: true,
  })
  status: string;

  @Column({
    type: DataType.ENUM(
      'Cardiology',
      'Dermatology',
      'Neurology',
      'Orthopedics',
      'Pediatrics',
      'Psychiatry',
      'Radiology',
      'General Medicine',
      'Surgery',
      'Oncology',
      'Gynecology',
      'ENT',
      'Urology',
    ),
    defaultValue: 'General Medicine', // You can set a default value if needed
    allowNull: true,
  })
  department: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes: string;
}

export default Appointment;
