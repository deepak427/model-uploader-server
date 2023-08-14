import dotenv from "dotenv";

dotenv.config();

export const config = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "us-east-1",
  endpoint: "s3.wasabisys.com",
  signatureVersion: "v4",
  httpOptions: {
    timeout: 3600000,
  },
};
