import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
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

  @Column
  sampleCollectedAt: Date;

  @Column
  reportIssuedAt: Date;

  @Column
  reportContent: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  cost: number;
}

export default Test;
