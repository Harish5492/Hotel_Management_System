/* eslint-disable prettier/prettier */
import{
    Table,
    Column,
    Model,
    DataType,
} from 'sequelize-typescript'

@Table
export class User extends Model<User>{
    @Column({
        type:  DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
  })
    // eslint-disable-next-line prettier/prettier
    id:string;
@Column({
    type:DataType.STRING,
    allowNull: false
})
  email:string;
@Column({
    type:DataType.STRING,
    allowNull:false
})
 firstName:string;
@Column({
    type:DataType.STRING,
    allowNull:false
 })
 lastName:string;
 @Column({
    type:DataType.DOUBLE,
    allowNull:false
 })
 mobileNo:number;

 @Column({
    type:DataType.STRING,
    allowNull:false
 })
 password:string;

 @Column({
    type:DataType.ENUM('MOBILE,EMAIL'),
    defaultValue:'Email' 
 })
 loginType:string;
 @Column({
    type:DataType.ENUM('DOCTOR,MANAGEMENT,PATIENT'),
    defaultValue:'PATIENT'
 })
 role:string;
 @Column({
    type: DataType.STRING,
  })
  otp: string;

  @Column({
    type: DataType.DOUBLE,
  })
  otpExpires: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  refreshToken: string;
}

export default User;