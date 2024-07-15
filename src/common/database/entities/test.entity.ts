import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.entity';

@Table
export class Tests extends Model<Tests> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  TestID: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  TestName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  Description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Cost: number;

  @ForeignKey(() => User) // Refer to the User model for doctor
  @Column
  prescribedByDoctorId: number;

  @BelongsTo(() => User, 'prescribedByDoctorId') // Refer to the User model for doctor
  prescribedByDoctor: User;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  Availability: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  CreatedAt: Date;
}

export default Tests;
