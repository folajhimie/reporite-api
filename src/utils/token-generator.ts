import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();


// JWT TOKEN 
export const generateAuthToken = (id: string) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || "your_jwt_secret";
  return jwt.sign({ id }, secret, {
    expiresIn: "1d",
  });
};

export const decodeAuthToken = (token: string) => {
  const secret = process.env.ACCESS_TOKEN_SECRET || "your_jwt_secret";
  return jwt.verify(token, secret);
};


