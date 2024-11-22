import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomLogger } from '../pkg/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLogger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        let statusColor: string;
        if (statusCode >= 500) {
          statusColor = statusCode.toString().red;
        } else if (statusCode >= 400) {
          statusColor = statusCode.toString().yellow;
        } else if (statusCode >= 300) {
          statusColor = statusCode.toString().cyan;
        } else if (statusCode >= 200) {
          statusColor = statusCode.toString().green;
        } else {
          statusColor = statusCode.toString().white;
        }

        this.logger.log(
          `${method.blue} ${url.magenta} ${statusColor} ${(Date.now() - now + 'ms').yellow}`,
        );
      }),
    );
  }
}
