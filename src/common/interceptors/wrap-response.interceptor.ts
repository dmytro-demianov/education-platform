import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.switchToHttp().getRequest().method === 'GET') {
      return next.handle().pipe(map((data) => ({ data })));
    }
    return next.handle();
  }
}