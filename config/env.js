import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT,
  COGNITO_REGION: process.env.COGNITO_REGION,
  COGNITO_USER_POOL_ID: process.env.COGNITO_USER_POOL_ID,
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
  SEGMENT_SIGNING_SECRET: process.env.SEGMENT_SIGNING_SECRET,
  TOKEN_EXPIREY: +process.env.TOKEN_EXPIREY,
};
