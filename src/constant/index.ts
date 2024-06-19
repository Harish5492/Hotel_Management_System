import { SWAGGER_OPERATION } from './swagger/operations.swagger';
import { ENVIROMENT_MANAGER } from './environment.setup';

export const SEQUELIZE = 'SEQUELIZE';
export const EM = ENVIROMENT_MANAGER;
export const DEVELOPMENT = 'dev';
export const STAGE = 'stage';
export const PRODUCTION = 'prod';
export const USER_REPOSITORY = 'USER_REPOSITORY';
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
    REFRESH_TOKEN: 'Refresh token successfully',
    OTP_VERIFIED: 'One time password has been verified successfully.',
    GET_USER_DETAILE: 'Get user detaile successfully.',
    GET_S3_DETAILE: 'Get S3 detaile successfully.',
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
  ERROR: {
    INCORRECT_OTP: 'Incorrect OTP, Please try again with resend code.',
    EXPIRES_OTP: 'Your OTP, Expires please try again with resend otp code.',
    INVALID_TOKEN: 'Invalid Token',
    OTPANDTOKENUSED: 'Either OTP or Token is already used. Kindly resend.',
    INCORRECT_SECURTY_PIN:
      'Incorrect security pin, Please try again with Forgot Security Pin.',
    USER_EXIST: 'User is already exist.',
    USER_NOT_EXIST: 'This user not exist.',
    USER_NOT_FOUND: 'Please, check you credentials. It do not match.',
    USER_BLOCKED: 'This account has been blocked by admin.',
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
    DO_NOT_MATCHED: 'do not matched.',
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
