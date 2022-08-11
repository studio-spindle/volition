import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectToken} from '../store/auth/auth.selectors';
import {AuthState} from '../store/auth/auth.state';
import {mergeMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authStateStore: Store<AuthState>,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return this.authStateStore.select(selectToken)
      .pipe(
        mergeMap((token) => {
          if (token) {
            const cloned = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${token}`),
            });
            return next.handle(cloned);
          } else {
            return next.handle(req);
          }
        })
      );
  }
}
