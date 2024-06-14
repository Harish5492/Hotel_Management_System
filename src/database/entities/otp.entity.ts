import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Otp extends Model<Otp> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userId: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  token: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  expirationDate: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isTokenUsed: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isOtpUsed: boolean;
}

export default Otp;
