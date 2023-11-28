import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongo: {
    url:process.env.MONGO_URL,
  },
  github: {
    callbackUrlReg: process.env.GITHUB_CALLBACK_URL_REG,
    callbackUrlLog:process.env.GITHUB_CALLBACK_URL_LOG,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  jwt: {
    pass: process.env.JWT_PRIVATE_KEY
  }
};
