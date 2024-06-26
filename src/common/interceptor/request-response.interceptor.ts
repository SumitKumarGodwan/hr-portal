import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { request } from "express";
import { Observable, map } from "rxjs";

@Injectable()
export class StandardResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const httpContext = context.switchToHttp().getResponse();
        return next.handle().pipe(
            map(async res => {
                return this.convertTOStandardResponse(res, httpContext.statusCode);
            })
        )
    }

    async convertTOStandardResponse(res: unknown, statusCode: number) {
        return {
            state: "SUCCESS",
            status: statusCode,
            data: res,
            path: request.url
        }
    }
}
