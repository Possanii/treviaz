import winston from 'winston'

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`
  })
)

// Create a Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    // Log to console
    new winston.transports.Console(),
  ],
})

export default logger
