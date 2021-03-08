import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    //console.log('JwtInterceptor username ::===>' + localStorage.TOKEN);
    //console.log("JwtInterceptor basicauth ::===>" + JSON.stringify(localStorage.getItem('basicauth')));

    let token = localStorage.getItem('TOKEN');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
          }
        },
        (error) => {
          console.log(error);
          let pathname = window.location.href;
          console.log(window.location.pathname);
          if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('LOGGED_IN_USER');
            this.toastr.error('Session expired...Redirecting to Login !!!');
            localStorage.removeItem('TOKEN');
            setTimeout(function () {
              window.location.href = 'auth/login?redirectUrl=' + pathname;
            }, 5000);

            //this.router.navigate(['/auth/login']);
          }
        }
      )
    );
  }
}
