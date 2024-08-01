import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { PatientTestRecord } from './patientTestRecord.entity';

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
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  Availability: boolean;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  DayTiming: {
    startTime: string;
    endTime: string;
  };

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  WeekSchedule: string;

  @HasMany(() => PatientTestRecord)
  patientTestRecords: PatientTestRecord[];
}

export default Tests;
