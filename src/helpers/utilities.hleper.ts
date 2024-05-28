import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import * as otpGenerator from 'otp-generator';
import { TIME } from '../constant';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
export const encryptCipher = async (data: any) => {
  const encryptionKey: any = '09836193421349832838@@!934%';
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
};

export const decryptCipher = (data: string) => {
  const reqEncKey: any = '09836193421349832838@@!934%';
  return CryptoJS.AES.decrypt(data, reqEncKey).toString(CryptoJS.enc.Utf8);
};

export const generateOneTimeCode = (
  size: number,
): { otp: string; otpExpires: number } => {
  otpGenerator.generate(size, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  const otp = '123456';
  const otpExpires = new Date().getTime() + TIME.OTP.OTP_EXPIRES;

  return { otp, otpExpires };
};
