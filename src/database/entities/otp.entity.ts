import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Otp extends Model<Otp> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // userId: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expirationDate: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  used: boolean;
}

export default Otp;
