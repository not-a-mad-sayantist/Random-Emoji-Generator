import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import pino from 'pino';

interface RequestWithCorrelationId extends Request {
  correlationId: string | string[];
}

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  base: null, // don’t add pid, hostname
  timestamp: pino.stdTimeFunctions.isoTime,
});

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: RequestWithCorrelationId, res: Response, next: NextFunction) {
    const start = Date.now();
    const correlationId = req.headers['x-correlation-id'] || randomUUID();

    // Make it available downstream
    req.correlationId = correlationId;
    res.setHeader('x-correlation-id', correlationId);

    const { method, originalUrl } = req;

    const logBody =
      req.body && Object.keys(req.body).length > 0
        ? safeBody(req.body)
        : undefined;

    // Log incoming request
    logger.info({
      event: 'request_received',
      correlationId,
      method,
      path: originalUrl,
      body: logBody,
      headers: req.headers,
    });

    // When response finishes
    res.on('finish', () => {
      const durationMs = Date.now() - start;

      logger.info({
        event: 'request_completed',
        correlationId,
        method,
        path: originalUrl,
        statusCode: res.statusCode,
        durationMs,
        body: logBody,
      });
    });

    // When the request dies mid-way
    res.on('close', () => {
      if (!res.writableEnded) {
        logger.warn({
          event: 'request_aborted',
          correlationId,
          method,
          path: originalUrl,
          durationMs: Date.now() - start,
        });
      }
    });

    next();
  }
}

// Prevent logging huge or sensitive bodies
function safeBody(body: unknown) {
  try {
    const clone = JSON.parse(JSON.stringify(body));

    // Redact obvious sensitive fields
    const sensitive = ['password', 'token', 'otp', 'secret'];
    for (const key of Object.keys(clone)) {
      if (sensitive.includes(key.toLowerCase())) {
        clone[key] = '**REDACTED**';
      }
    }

    // Avoid logs exploding from massive bodies
    return JSON.stringify(clone).slice(0, 2000);
  } catch {
    return '[unserializable_body]';
  }
}
