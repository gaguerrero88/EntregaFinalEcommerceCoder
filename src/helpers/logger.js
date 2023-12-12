
import {createLogger, format, transports} from "winston";
import { __dirname } from "../utils.js";
import path from "path";
import { config } from "../config/config.js";
const { combine, timestamp, printf } = format;

const currentEnv = config.logger.env || "development";

const logFormat = printf(({ level, message, timestamp,stack }) => {
  return `${timestamp} ${level}: ${message || stack}`;
});

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
colors: {
    fatal: "red",
    error: "blue",
    warning: "yellow",
    info: "green",
    http: "cyan",
    debug: "magenta",
}
};


const devLogger = createLogger({
    
    format: combine(
        format.colorize({colors: customLevels.colors}),
        timestamp({format: "YY-MM-DD HH:mm:ss"}),
        format.errors({stack:true}),
        logFormat,
      ),
  levels: customLevels.levels,
  transports: [new transports.Console({ level: "debug" })],
});

const prodLogger = createLogger({
    format: combine(
      format.colorize({colors: customLevels.colors}),
      timestamp({format: "YY-MM-DD HH:mm:ss"}),
      format.errors({stack:true}),
      format.json(),
      logFormat,
      ),
  levels: customLevels.levels,
  transports: [
    new transports.Console({ level: "info" }),
    new transports.File({ filename: path.join(__dirname, "/logs/errors.log"), level: "info" }),
  ],
});

let logger;

if (currentEnv === "development") {
  logger = devLogger;
} else {
  logger = prodLogger;
}

export { logger };
