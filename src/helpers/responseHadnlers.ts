import { HttpStatus } from '@nestjs/common';

/*
 * @desc: success response handler
 * @param: { message: string, data: any }
 * @return: { error: boolean, status: number, timestamp: string, path: string, method: string, message: string, data: any }
 */
export const successResponse = (message: string, data: object = {}) => {
  return {
    status: HttpStatus.OK,
    timestamp: new Date().toISOString(),
    message: message,
    ...(data && { data }),
  };
};

export const throwForbidden = () => {
  const error: any = new Error();
  error.status = '403';
  error.isLogout = true;
  throw error;
};

export const throwError = (message: string, data: object = {}) => {
  const error: any = new Error(message);
  error.status = '400';
  error.error = data;
  throw error;
};

/*
 * @desc: error response handler
 * @param: { message: string, data: any }
 * @return: { error: boolean, status: number, timestamp: string, path: string, method: string, message: string, data: any }
 * @example: errorResponse('User not found', {})
 */
export const errorResponse = (message: string, data: any = {}) => {
  return {
    error: true,
    status: HttpStatus.BAD_REQUEST,
    timestamp: new Date().toISOString(),
    message: message,
    data: data,
  };
};
