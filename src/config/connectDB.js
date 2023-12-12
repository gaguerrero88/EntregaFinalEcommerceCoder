import mongoose from "mongoose";
import { config } from "./config.js"
import {logger} from "../helpers/logger.js"

export const connectionDB = async () => {
  try {
    await mongoose.connect(
     config.mongo.url
    );
    logger.info("base de datos conectada correctamente");
  } catch (error) {
    logger.error (`hubo un error al conectar a la base de datos ${error.mesagge}`);
  }
};
