const winston = require("winston");
const { format, createLogger, transports } = require("winston");
const fse = require("fs-extra");

const DailyRotateFile = require("winston-daily-rotate-file");

// Create the logs directory if it does not exist
const logsDir = "./src/logs";
if (!fse.existsSync(logsDir)) {
  fse.mkdirSync(logsDir);
}

const enumerateErrorFormat = winston.format((info) => {
  if (info.message instanceof Error) {
    info.message = {
      message: info.message.message,
      stack: info.message.stack,
      ...info.message,
    };
  }

  if (info instanceof Error) {
    return { message: info.message, stack: info.stack, ...info };
  }

  return info;
});

//DailyRotateFile func()
const fileRotateTransport = new transports.DailyRotateFile({
  filename: `${logsDir}/exceptions-%DATE%.log`,
  datePattern: "DD-MM-YYYY",
  maxFiles: "5d",
});

const logger = winston.createLogger({
  // format: winston.format.combine(enumerateErrorFormat(), winston.format.json()),

  level: "error", // Set the minimum logging level to 'error' to only log errors
  format: winston.format.combine(
    // winston.format.colorize(),
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), // Add timestamp to log entries (ddd, DD-MMM-YYYY HH:mm:ss)
    winston.format.printf((info) => {
      if (info instanceof Error) {
        return `${info.timestamp}: ${info.stack} \n`; // [${info.level}]
      }
      return `${info.timestamp}  ${info.message} \n`; //[${info.level}]
    })
  ),
  transports: [new transports.Console(), fileRotateTransport],
});
module.exports = logger;
