import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "";

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

const JWT_SECRET = process.env.JWT_SECRET || "";

export const config = {
  mongodb: {
    url: MONGODB_URI
  },
  server: {
    port: SERVER_PORT
  },
  jwt: {
    key: JWT_SECRET
  }
};
