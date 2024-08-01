import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Tests from './test.entity';
import User from './user.entity';

@Table
export class PatientTestRecord extends Model<PatientTestRecord> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Tests)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  testId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  patientId: string;

  @Column({
    type: DataType.ENUM('Pending', 'Completed', 'Cancelled'),
    allowNull: true,
  })
  status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  Cost: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  TestTakenAt: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  ReportGivenAt: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ReportContent: string;

  @BelongsTo(() => Tests)
  test: Tests;

  @BelongsTo(() => User)
  patient: User;
}

export default PatientTestRecord;
