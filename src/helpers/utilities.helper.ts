import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto';
import * as otpGenerator from 'otp-generator';
import { TIME } from '../constant';
import { EM } from '../constant';

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
  const encryptionKey: any = EM.ENCDECRYPT_KEY;
  return CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
};

export const decryptCipher = (data: string) => {
  const reqEncKey: any = EM.ENCDECRYPT_KEY;
  const parsedToken = JSON.parse(
    CryptoJS.AES.decrypt(data, reqEncKey).toString(CryptoJS.enc.Utf8),
  );
  return parsedToken;
};

export const generateHexadecimal = (name: string) => {
  // Combine name, email, and a random component with the current time
  const seed = `${name}${Math.floor(Math.random() * 1e6)}${Date.now()}`;

  // Create a SHA-256 hash of the seed
  const hash = crypto.createHash('sha256');
  hash.update(seed);

  // Get the hexadecimal representation of the hash
  const hexNumber = hash.digest('hex');

  // Extract the first 16 characters (or adjust as needed)
  const uniqueHex = hexNumber.slice(0, 16);

  // Reflect the first 3 characters of the name and email
  const reflectedFirstName = name.slice(0, 3).toUpperCase(); // Ensure uppercase, adjust as needed

  // Concatenate the unique hex with reflected parts
  const combinedId = `${reflectedFirstName}-${uniqueHex}`;

  return combinedId;
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
