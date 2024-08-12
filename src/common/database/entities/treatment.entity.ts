import {
  DataType,
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.entity';
import Tests from './test.entity';

@Table
export class Treatment extends Model<Treatment> {

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  patientId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  patientName: string;

  @ForeignKey(() => User) // Refer to the User model for doctor
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  doctorId: string;

  @BelongsTo(() => User) // Refer to the User model for doctor
  doctor: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  doctorName: string;

  @ForeignKey(() => Tests)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  testId: number;

  @BelongsTo(() => Tests)
  test: Tests;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  disease: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  firstVisitAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  nextScheduleAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  fullyCuredAt: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  medication: string;

  @Column({
    type: DataType.ENUM('ONGOING', 'COMPLETED', 'CANCELLED', 'SCHEDULED'),
    defaultValue: 'ONGOING',
    allowNull: false,
  })
  treatmentStatus: string;

  @Column({
    type: DataType.ENUM('STABLE', 'CRITICAL', 'RECOVERING', 'DISCHARGED'),
    defaultValue: 'STABLE',
    allowNull: false,
  })
  patientCondition: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  notes: string;
}

export default Treatment;
