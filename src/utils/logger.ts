import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogMetadata {
  [key: string]: any;
}

class Logger {
  private static getTimestamp(): string {
    return new Date().toISOString();
  }

  private static formatMessage(level: LogLevel, message: string, meta?: LogMetadata): string {
    const timestamp = this.getTimestamp();
    const metaString = meta ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
  }

  static debug(message: string, meta?: LogMetadata): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }

  static info(message: string, meta?: LogMetadata): void {
    console.log(this.formatMessage('info', message, meta));
  }

  static warn(message: string, meta?: LogMetadata): void {
    console.warn(this.formatMessage('warn', message, meta));
  }

  static error(message: string, meta?: LogMetadata): void {
    console.error(this.formatMessage('error', message, meta));
  }

  static requestLogger() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const requestId = uuidv4();
      const start = Date.now();
      
      // Add request ID to request object for use in other middleware
      req.requestId = requestId;
      
      // Log request start
      this.debug('Request started', {
        requestId,
        method: req.method,
        //url: req.url,
        //userAgent: req.get('user-agent'),
      });

      // Log response
      res.on('finish', () => {
        const duration = Date.now() - start;
        const message = `${req.method} ${req.url} ${res.statusCode} ${duration}ms`;
        
        const baseMeta = {
          requestId,
          duration,
          // ip: req.ip,
          // userAgent: req.get('user-agent'),
        };

        if (res.statusCode >= 500) {
          this.error(message, {
            ...baseMeta,
            body: req.body,
            headers: req.headers,
            query: req.query,
            params: req.params,
            error: res.locals.error,
          });
        } else if (res.statusCode >= 400) {
          this.warn(message, {
            ...baseMeta,
            body: req.body,
            query: req.query,
            params: req.params,
          });
        } else {
          this.info(message, baseMeta);
        }
      });

      next();
    };
  }

  // Helper method to log database operations
  static db(message: string, meta?: LogMetadata): void {
    this.debug(`[DB] ${message}`, meta);
  }

  // Helper method to log authentication events
  static auth(message: string, meta?: LogMetadata): void {
    this.info(`[AUTH] ${message}`, meta);
  }
}

// Extend Express Request type to include requestId
declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export default Logger; 