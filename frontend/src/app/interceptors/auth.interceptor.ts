import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('accessToken');
    let request = req;

    // if request is for logout, don't add token
    if (req.url.includes('logout')) {
      return next.handle(req);
    }

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    }
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          console.log(err.status, 'ERROR');
          return throwError(() => new Error('User not logged in'))
        } else if (err.status === 403) {
          return this.handle403Error(request, next)
        } else {
          return throwError(() => new Error('Something went wrong'))
        }
      }));
  }

  handle403Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.refresh().pipe(
      switchMap((tokenData) => {
        const newRequest = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${tokenData.accessToken}`)
        })
        return next.handle(newRequest);
      })
    )
  }
}