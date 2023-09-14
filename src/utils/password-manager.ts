import bcrypt from "bcryptjs";
import crypto from 'crypto';

// Replace these with your own values
const encryptionAlgorithm = 'aes-256-cbc'; // AES encryption with 256-bit key in CBC mode
const secretKey = 'your-secret-key'; // Replace with your actual secret key (32 bytes for AES-256)
const iv = crypto.randomBytes(16); // Initialization Vector (IV) should be random and unique

// // Encrypt the data
// const encryptedData = encrypt(originalData);

// // Decrypt the data
// const decryptedData = decrypt(encryptedData);

export const createRandomToken = (token: string | number | any): string => {
  let resetToken = crypto.randomBytes(32).toString("hex") + token;
  return resetToken;
};

export const hashToken = (token: string | number): string => {
  return crypto.createHash("sha256").update(token.toString()).digest("hex");
};

// Function to decrypt data
export const decrypt = (encryptedText: string): string => {
  const decipher = crypto.createDecipheriv(encryptionAlgorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Function to encrypt data
export const encrypt = (text: string): string => {
  const cipher = crypto.createCipheriv(encryptionAlgorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}


export const generateHashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
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




