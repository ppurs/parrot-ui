import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable()
export class DefaultOptionsInterceptor implements HttpInterceptor {
    private readonly HEADERS = { 'Content-Type': 'application/json' };

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const req = request.clone({
            setHeaders: this.HEADERS
        });

        return next.handle(req);
    }

}