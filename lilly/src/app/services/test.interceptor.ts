import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpResponse
} from '@angular/common/http';
import { testService } from './test.services';
import { BehaviorSubject, Observable, throwError, of, tap } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';


export const BYPASS_LOG = new HttpContextToken(() => false);
@Injectable()
export class TestInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject(null);

  constructor(private authService:testService) {}
  private cache = new Map<string, any>();
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.context.get(BYPASS_LOG) === true) {
      if (request.method !== 'GET') {
        return next.handle(request);
      } else {
        const cachedResponse = this.cache.get(request.url);

        if (cachedResponse) {
          return of(cachedResponse);
        }

        return next.handle(request).pipe(
          tap((response) => {
            if (response instanceof HttpResponse) {
              this.cache.set(request.url, response);
            }
          })
        );
      }
    } else {
      return next.handle(this.addAuthToken(request)).pipe(
        catchError((requestError: HttpErrorResponse) => {
          if (requestError && requestError.status === 401) {
            if (this.refreshTokenInProgress) {
              return this.refreshTokenSubject.pipe(
                take(1),
                switchMap(() => next.handle(this.addAuthToken(request)))
              );
            } else {
              this.refreshTokenInProgress = true;
              this.refreshTokenSubject.next(null);
  
              return this.authService.getAuthToken().pipe(
                switchMap((token) => {
                  this.refreshTokenSubject.next(token['accessToken']);
                  return next.handle(this.addAuthToken(request));
                }),
                finalize(() => (this.refreshTokenInProgress = false))
              );
            }
          } else {
            return throwError(() => new Error(requestError.message));
          }
        })
      );
    }

  }

  addAuthToken(request: HttpRequest<any>) { 
    const token = this.getAuthToken();

    if (!token) {
      return request;
    } 

    return request.clone({
      setHeaders: {
        'guesttoken':'true',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
  }

  getAuthToken() {
    return this.refreshTokenSubject.value;
  }
}
