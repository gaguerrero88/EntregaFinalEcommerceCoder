import dotenv from "dotenv";
import path from "path";
import { Command } from "commander";
import { __dirname } from "../utils.js";
const program = new Command();
program.option("--mode <mode>", "modo de trabajo", "development");
program.parse();
const args = program.opts();
const envMode = args.mode;

let pathenv;

if (envMode === "production") {
  pathenv = path.join(__dirname, "../.env.prod");
} else {
  pathenv = path.join(__dirname, "../.env.dev");
}


dotenv.config({
  path: pathenv,
});

export const config = {
  mongo: {
    url: process.env.MONGO_URL,
  },
  github: {
    callbackUrlReg: process.env.GITHUB_CALLBACK_URL_REG,
    callbackUrlLog: process.env.GITHUB_CALLBACK_URL_LOG,
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
  jwt: {
    pass: process.env.JWT_PRIVATE_KEY,
  },
  logger: {
    env: process.env.NODE_ENVIROMENT,
  },
  gmail: {
    account: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASS,
    secretToken: process.env.TOKEN_EMAIL
  },
  server: {
    port: process.env.PORT
  }
};
