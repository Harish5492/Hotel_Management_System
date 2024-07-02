import { Table, Model, DataType, Column } from 'sequelize-typescript';

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
}

export default Test;
