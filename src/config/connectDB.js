import mongoose from "mongoose";
import { config } from "./config.js"

export const connectionDB = async () => {
  try {
    await mongoose.connect(
     config.mongo.url
    );
    console.log("base de datos conectada correctamente");
  } catch (error) {
    console.log(`hubo un error al conectar a la base de datos ${error.mesagge}`);
  }
};
