import { SWAGGER_OPERATION } from './swagger/operations.swagger';
import { ENVIROMENT_MANAGER } from './environment.setup';

export const SEQUELIZE = 'SEQUELIZE';
export const EM = ENVIROMENT_MANAGER;
export const DEVELOPMENT = 'dev';
export const STAGE = 'stage';
export const PRODUCTION = 'prod';
export const USER_REPOSITORY = 'USER_REPOSITORY';
export const TEST_REPOSITORY = 'TEST_REPOSITORY';
export const APPOINTMENTS_REPOSITORY = 'APPOINTMENTS_REPOSITORY';
export const TREATMENT_REPOSITORY = 'TREATMENT_REPOSITORY';
export const AMBULANCE_REPOSITORY = 'AMBULANCE_REPOSITORY';
export const SERVICE_FACILITY_REPOSITORY = 'SERVICE_FACILITY_REPOSITORY';
export const NOTIFICATION_REPOSITORY = 'NOTIFICATION_REPOSITORY';
export const ADMIN_REPOSITORY = 'ADMIN_REPOSITORY';
export const KYC_REPOSITORY = 'KYC_REPOSITORY';
export const COUNTRY_REPOSITORY = 'COUNTRY_REPOSITORY';
export const STATE_REPOSITORY = 'STATE_REPOSITORY';
export const API_OPERATIONS = SWAGGER_OPERATION;

export const TIME = {
  JWT: {
    FIFTEEN_MINUTES: '15m',
    TWO_MINUTES: '2m',
    FIVE_DAYS: '5d',
    THIRTY_DAYS: '30d',
  },
  OTP: {
    OTP_EXPIRES: 5 * 60 * 1000,
  },
};

export const EXCLUDES = {
  USER_EXCLUDE: ['password', 'refreshToken', 'mPin', 'otp', 'otpExpires'],
  KYC_EXCLUDE: ['password', 'refreshToken', 'mPin', 'otp', 'otpExpires'],
  ADMIN_EXCLUDE: ['password', 'id', 'google2FASecret', 'email'],
};

export const MESSAGES = {
  USER: {
    SIGN_UP_SUCCESS: 'You have registered successfully.',
    SIGN_IN_SUCCESS: 'You have logged in successfully',
    ACCOUNT_VERIFIED: 'Your account has been verified successfully.',
    ACCOUNT_DELETED: 'Your account has been deleted successfully.',
    REFRESH_TOKEN: 'Refresh token successfully',
    OTP_VERIFIED: 'One time password has been verified successfully.',
    GET_USER_DETAILE: 'Got user detail successfully.',
    GET_S3_DETAILE: 'Got S3 detaile successfully.',
    RESEND_OTP: 'Your otp resend successfully.',
    SEND_OTP: 'Your otp send successfully.',
    UPDATE_PASSWORD: 'Your password update successfully.',
    SECURTY_PIN_CREATE: 'Your securty pin created successfully.',
    CHANGE_PASSWORD: 'Your change password has been successfully.',
    UPDATE_EMAIL_MOBILE_STEP: 'Code sent successfully.',
    LOGGED_OUT: 'You have been logged out successfully.',
    GET_RECORD: 'record get successfully.',
    SEND_TRANSACTION_SUCCESSFULL: 'Transaction successfull',
    SEND_TRANSACTION_FAILED: 'Transaction failed',
    DOCTOR_AVALIABLITY:
      'List of doctor present in hospital has been fetched successfully',
    CHANGE_AVALIABLITY: 'Avaliablity status has been changed',
  },
  TEST: {
    ADD_TEST_SUCCESS: 'Test added successfully.',
    DISABLE_TEST: 'Test disabled successfully',
    TEST_TAKEN_OF_PATIENT: 'Test has been taken successfully',
    REPORT_GIVEN: 'Test report has been given successfully',
    ALL_TESTS: 'Tests has been fetched successfully',
    TEST_NOT_AVAILABLE: 'Test not availabe, Sorry visit again',
    WRONG_PATIENT_ID: 'You have given wrong patientId kindly check again',
  },
  PATIENT: {
    PATIENT_ADDED: 'Patient data has been added successfully',
    UPDATED_PATIENT_DATA: 'Patient data has been updated successfully',
    FETCHED_PATIENT_DETAILS: 'Patient data has been fetched successfully',
    PATIENT_REFER: 'Patient refered successfully',
  },
  MANAGEMENT: {
    AMBULANCE_ADDED: 'Ambulance has been added successfully',
    UPDATE_AMBULANCE_STATUS: 'Ambulance status has been updated successfully',
    FACILITY_ADDED: 'Facility has been added successfully',
    GET_AMBULANCE_DETAILS: 'Ambulance data has been fetched successfully',
    GET_FACILITY_DETAILS: ' Facility data has been fetched successfully',
    AMBULANCE_TAKEN: 'Ambulance has been taken successfully',
  },
  ADMIN: {
    SIGN_IN_SUCCESS: 'You have logged in successfully',
    PASSWORD_UPDATED: 'Password updated successfully',
    SECRET_GENERATED: '2FA secret generated successfully.',
    TWO_FACTOR_SUCCESS: '2FA code verified successfully.',
    USERS_LIST: 'Users fetched successfully.',
    USERS_STATUS: 'Users status updated successfully.',
    KYC_STATUS: 'KYC status updated successfully.',
  },
  NOTIFICATION: {
    NOTIFICATION_SENT: 'Notification sent successfully.',
    NOTIFICATIONS_LIST: 'Notifications fetched successfully.',
  },
  ROLE: {
    ONLY_MANAGEMENT: 'Only Mangement have the access to do the particular task',
    ONLY_DOCTOR: 'Only Doctor have the access to do the particular task',
    ONLY_DOCTOR_AVIALIBILITY_CHECK: 'Only Doctor Availability will check ',
    ONLY_PATIENT: 'Only Patient have the access to do the particular task',
  },
  ERROR: {
    INCORRECT_OTP: 'Incorrect OTP or Token, Please try again with resend code.',
    EXPIRES_OTP: 'Your OTP, Expires please try again with resend otp code.',
    INVALID_TOKEN: 'Invalid Token',
    OTPANDTOKENUSED: 'Either OTP or Token is already used. Kindly resend.',
    INCORRECT_SECURTY_PIN:
      'Incorrect security pin, Please try again with Forgot Security Pin.',
    USER_EXIST: 'User is already exist.',
    USER_NOT_EXIST: 'This user not exist.',
    USER_NOT_FOUND: 'Please, check you credentials. It do not match.',
    USER_BLOCKED: 'This account has been blocked by admin.',
    USER_NOT_VERIFIED:
      'User is not verified. Kindly, verify your Mobile No. and Email Address',
    INCORRECT_PASSWORD: 'Incorrect old password, Please try again.',
    INCORRECT_SECURITY_PIN: 'Incorrect old security pin, Please try again.',
    ACCESS_DENIED: 'ACCESS_DENIED',
    USER_VERIFIED: 'Your account is already verified.',
    INVALID_CREDENTIALS: 'Invalid credentials provided',
    INVALID_2FA_CODE: 'Invalid code provided.',
    EMAIL_EXISTS: 'Email is already exists.',
    EMAIL_VERIFIED: 'Email is already verified.',
    MOBILE_EXISTS: 'Mobile no. is already exists.',
    MOBILE_VERIFIED: 'Mobile no. is already verified.',
    INVALID_MOBILE_NO: 'Mobile no must has exactly 10 digits',
    DO_NOT_MATCHED: 'Do not matched.',
    TEST_EXISTS: 'Test already exists.',
    TEST_NOT_EXISTS: 'Test not exists.',
    TEST_DATA_NOT_EXISTS: 'Test report does not exists in database',
    AMBULANCE_EXISTS: 'Ambulance already exists',
    FACILITY_EXISTS: 'Facility already exists',
    PASSWORD_NOT_MATCHED: 'Password not matched',
  },
};
// export const WALLET_GRPC_PACKAGE = 'gateway';
// export const GRPC_CLIENC_CONNECTIONS = {
//   WALLET_GATEWAY: {
//     options: {
//       url: process.env.GATEWAY_GRPC_CLIENT,
//       package: WALLET_GRPC_PACKAGE,
//       protoPath: join(__dirname, '../common/grpc/protos/gateway.proto')
//     },
//   },
// }
