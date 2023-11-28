import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {config} from "./config/config.js"


export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync());
};

export const isValidPassword = (password, user) => {
  return bcrypt.compareSync(password, user.password);
};

export const generateToken = (user) => {
  const token = jwt.sign({ name: user.name, email: user.email, role: user.role,cartId: user.cartId }, config.jwt.pass, { expiresIn: "24h" });
  return token;
};


