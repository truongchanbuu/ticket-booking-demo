import dotenv from "dotenv";
dotenv.config();

const KAFKA_BROKER_DEFAULT = "192.168.174.120:9202";
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT ? +process.env.PORT : 3000,
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  KAFKA_BROKER_1: process.env.KAFKA_BROKER_1 || KAFKA_BROKER_DEFAULT,
  KAFKA_BROKER_2: process.env.KAFKA_BROKER_2 || KAFKA_BROKER_DEFAULT,
  KAFKA_BROKER_3: process.env.KAFKA_BROKER_3 || KAFKA_BROKER_DEFAULT,
};
