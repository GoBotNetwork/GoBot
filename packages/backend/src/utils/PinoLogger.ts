import { Logger } from "typeorm";
import pino from "pino";

export class PinoTypeormLogger implements Logger {
  private readonly logger: pino.Logger;

  constructor(logger: pino.Logger) {
    this.logger = logger;
  }

  log(level: "log" | "info" | "warn" | "error", message: any, data?: any) {
    if (data) {
      this.logger[level](message, data);
    } else {
      this.logger[level](message);
    }
  }

  logQuery(query: string, parameters?: any[]) {
    this.logger.info(query, parameters);
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    this.logger.error(error, { query, parameters });
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.info(`${time}ms`, { query, parameters });
  }

  logSchemaBuild(message: string) {
    this.logger.info(message);
  }

  logMigration(message: string) {
    this.logger.info(message);
  }
}