import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './index';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in
        return this.authService.userSubject.pipe(
            take(1),
            exhaustMap(user => {
              console.log('ciaooooooo')
              console.log(user)
              if (user === null || user === undefined) {
                return next.handle(request);
              }
              
              const modifiedRequest = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
              });
              return next.handle(modifiedRequest);
            })
          );
    }
}