import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.entity';

@Table
export class Tests extends Model<Tests> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  TestName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  LabName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  Description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  Cost: number;

  @Column({
    type: DataType.ENUM('Available', 'NotAvailable'),
    defaultValue: 'Available',
  })
  Availability: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  DayTiming: {
    startTime: string;
    endTime: string;
  };

  @Column({
    type: DataType.STRING, // Storing as comma-separated values (e.g., 'Monday,Tuesday,Wednesday')
    allowNull: true,
  })
  WeekSchedule: string;

  @Column({
    type: DataType.ENUM('Pending', 'Completed', 'Cancelled'),
    allowNull: true,
  })
  status: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  patientId: string;

  @BelongsTo(() => User)
  patient: User;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  TestTakenAt: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  ReportGivenAt: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  ReportContent: string;
}

export default Tests;
