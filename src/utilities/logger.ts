import { createLogger, format, transports } from 'winston'

export const provideLogger = (name: string) => createLogger({
  level: 'info',
  defaultMeta: { type: name },
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp(),
    format.printf(({ level, message, timestamp, type }) => {
      return `${timestamp} [${level}] ${type}: ${message}`
    }),
  ),
  transports: [
    new transports.Console(),
  ],
})
