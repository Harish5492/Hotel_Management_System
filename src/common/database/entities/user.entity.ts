/* eslint-disable prettier/prettier */
import {
    Table,
    Column,
    Model,
    DataType,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
   
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
    email: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isEmailVerified: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false,
    })
    mobileNo: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isMobVerified: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.ENUM('DOCTOR', 'MANAGEMENT', 'PATIENT'),
        defaultValue: 'PATIENT',
        allowNull: false,
    })
    role: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    token: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: true,
    })
    IsTokenUsed: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    otp: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull : true
    })
    IsOtpUsed: boolean;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
      })
      refreshToken: string;
    
    @Column({
    type: DataType.DATE,
        allowNull: true,
    })
    expirationDate: Date;
  
}

export default User;