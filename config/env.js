import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGO_URI;
export const EMAIL_USER = process.env.EMAIL_USER;
export const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;