import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BrowserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.headers['user-agent'];
    if (
      userAgent &&
      (userAgent.includes('chrome') || userAgent.includes('firefox'))
    ) {
      console.log('Browser detected');
    }
    return next.handle();
  }
}
