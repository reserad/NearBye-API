import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl, query, body, params } = request;
    const userAgent = request.get('user-agent') || '';

    const originalSend = response.send;
    response.send = data => {
      let formattedData = data;
      try {
        formattedData = JSON.parse(data);
      } catch (error) {}

      this.logger.log({
        meta: {
          ip,
          method,
          originalUrl,
          userAgent,
        },
        request: {
          query,
          body,
          params,
        },
        response: formattedData,
      });
      response.send = originalSend;
      return response.send(data);
    };

    next();
  }
}
