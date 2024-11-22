import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as colors from 'colors';

@Injectable()
export class CustomLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          let coloredLevel: string;
          switch (level) {
            case 'error':
              coloredLevel = colors.red(level);
              break;
            case 'warn':
              coloredLevel = colors.yellow(level);
              break;
            case 'info':
              coloredLevel = colors.green(level);
              break;
            case 'debug':
              coloredLevel = colors.blue(level);
              break;
            default:
              coloredLevel = colors.white(level);
          }
          return `${colors.gray(<string>timestamp)} [${coloredLevel}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(colors.green(message));
  }

  error(message: string, trace: string) {
    this.logger.error(colors.red(message), { trace: colors.red(trace) });
  }

  warn(message: string) {
    this.logger.warn(colors.yellow(message));
  }

  debug(message: string) {
    this.logger.debug(colors.blue(message));
  }

  verbose(message: string) {
    this.logger.verbose(colors.cyan(message));
  }
}
