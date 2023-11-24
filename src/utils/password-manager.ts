import bcrypt from "bcryptjs";
import * as crypto from 'crypto';

// Replace these with your own values
const encryptionAlgorithm: string = 'aes-256-cbc'; // AES encryption with 256-bit key in CBC mode
const keyHex = '0123456789abcdef0123456789abcdef';
const ivHex = '0123456789abcdef';

const key = '0123456789abcdef0123456789abcdef'; // Should be a 32-byte string for AES-256
const iv = crypto.randomBytes(16); // Initialization vector (16 bytes for AES)

// const key = Buffer.from(keyHex, 'hex');
// const iv = Buffer.from(ivHex, 'hex');

// const key = '0123456789abcdef0123456789abcdef'; // 16 bytes for aes-128-cbc
// const iv = '0123456789abcdef' // 16 bytes for aes-128-cbc
// const secretKey: Buffer | any = Buffer.from('0123456789abcdef0123456789abcdef', 'hex'); // 32 bytes for aes-256
// const iv: Buffer | any = crypto.randomBytes(16); // Initialization Vector (IV) should be random and unique





// const algorithm = 'aes-256-cbc';
// const key = 'your-secret-key'; // Replace with your actual secret key
// const iv = 'your-initialization-vector'; // Replace with your actual initialization vector

// Create a Cipheriv object
// const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), Buffer.from(iv));

// Assuming 'textToEncrypt' is the text you want to encrypt
// let encryptedText = cipher.update('textToEncrypt', 'utf-8', 'hex');
// encryptedText += cipher.final('hex');

// console.log('Encrypted Text:', encryptedText);





// const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);



export const createRandomToken = (token: string | number | any): string => {
  let resetToken = crypto.randomBytes(32).toString("hex") + token;
  return resetToken;
};

export const hashToken = (token: string | number): string => {
  return crypto.createHash("sha256").update(token.toString()).digest("hex");
};

// Function to decrypt data
export const decrypt = (encryptedText: string): string => {
  const decipher = crypto.createDecipheriv(encryptionAlgorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


export const encrypt = (text: string): string => {
  console.log("all this error token..", text, key, iv, encryptionAlgorithm);
  
  // const cipher = crypto.createCipheriv(encryptionAlgorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  console.log("cipher...", cipher);

  let encryptedData = cipher.update(text, 'utf-8', 'hex');
  console.log("hello hash..", encryptedData);

  encryptedData += cipher.final('hex');
  
  // Print the encrypted data and IV
  console.log('Encrypted Data:', encryptedData);
  // console.log('Initialization Vector (IV):', Buffer.from(iv, 'hex').toString('hex'));
  
  return encryptedData;
}


export const generateHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  // console.log("all the time..", password, salt);
  return await bcrypt.hash(password, salt);

};

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(password, hashPassword);
};

export const compareEmail =  (
  email: string,
  userEmail: string,
) => {
  return email.toLowerCase() === userEmail.toLowerCase();
};




