import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as path from 'node:path';

@Injectable()
export class StatLoggerMiddleware implements NestMiddleware {
  private gcCount = 0;

  constructor() {
    const obs = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      this.gcCount += entries.length;
    });
    obs.observe({ entryTypes: ['gc'] });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const timestamp = new Date().toISOString();
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    const logEntry = {
      '@timestamp': timestamp,
      caller: this.getCaller(),
      content: `CPU: ${Math.round(cpuUsage.user / 1000000)}m, MEMORY: Alloc=${Math.round(memoryUsage.heapUsed / (1024 * 1024))}Mi, TotalAlloc=${Math.round(memoryUsage.heapTotal / (1024 * 1024))}Mi, Sys=${Math.round(memoryUsage.rss / (1024 * 1024))}Mi, NumGC=${this.gcCount}`,
      level: 'info',
    };

    console.log(JSON.stringify(logEntry));

    next();
  }

  private getCaller(): string {
    const error = new Error();
    const stack = error.stack?.split('\n');
    if (stack && stack.length > 3) {
      const callerLine = stack[3].trim();
      const match = callerLine.match(/\((.+):(\d+):(\d+)\)$/);
      if (match) {
        const [, filePath, line, column] = match;
        const fileName = path.basename(filePath);
        return `${fileName}:${line}:${column}`;
      }
    }
    return 'Unknown';
  }
}
