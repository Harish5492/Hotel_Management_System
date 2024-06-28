import {
  Table,
  Model,
  DataType,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import User from './user.entity';

@Table
export class Test extends Model<Test> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  testName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  referredFrom: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  testDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  testResult: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  cost: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  remarks: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}

export default Test;
