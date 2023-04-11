import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          // need to redo
          // if (error.status === 401) {
          //   this.router.navigate(['signin'])
          //   alert("username or password is wrong, please try again")
          // }

          return throwError(() => error);
        })
      );
  }
}