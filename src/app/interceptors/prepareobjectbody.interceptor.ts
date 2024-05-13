import {
    ExecutionContext,
    Injectable,
    NestInterceptor,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class PrepareObjectBody<T> implements NestInterceptor {

    constructor(private readonly dto: new (...args: any[]) => T) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {


        const request = context.switchToHttp().getRequest();
        let body = request.body;
        if (typeof body !== 'object') {
            let obj = {};
            try {
                obj = JSON.parse(body);
            } catch (e) {
                throw e;
            }
            body = obj;
        }
        let instance = new this.dto();
        instance = body;
        request.body = instance;

        return next.handle();

    }

}