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
  userId: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @ForeignKey(() => User) // Refer to the User model for doctor
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  doctorId: string;

  @BelongsTo(() => User, 'doctorId') // Refer to the User model for doctor
  doctor: User;

  @ForeignKey(() => Tests)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  testId: number;

  @BelongsTo(() => Tests)
  test: Tests;

  @Column
  disease: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  sampleCollectedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  sampleReportAt: Date;

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
}

export default Treatment;
