import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(public auth: AuthService) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (this.auth.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
  //     const authReq = req.clone({
  //       headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0YXZpLnpvcmlsYUBnbWFpbC5jb20iLCJzY29wZXMiOiJST0xFX0FETUlOIiwiaWF0IjoxNjEyMjA4MDMwLCJleHAiOjE2MTIyMjYwMzB9.Br8NBG7dsT5doS6ItLJMaJgkvTqMGxZCcsI-P9qBBa8')
  //     });
  //     return next.handle(authReq);
  //   } else {
  //     return next.handle(req);
  //   }
  // }

  // tslint:disable-next-line:typedef
  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //
  //   if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
  //     req = req.clone({
  //       setHeaders: {
  //          Authorization: sessionStorage.getItem('token')
  //         // Authorization: this.auth.createBasicAuthToken()
  //       }
  //     });
  //   }
  //
  //   return next.handle(req);
  //
  // }


// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     if (this.auth.isUserLoggedIn() && req.url.indexOf('login') === -1) {
//       const authReq = req.clone({
//         headers: new HttpHeaders({
//           Authorization: `Bearer ${this.auth.TOKEN_SESSION_ATTRIBUTE_NAME}`
//         })
//       });
//       return next.handle(authReq);
//     } else {
//       return next.handle(req);
//     }
//   }



  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (this.auth.isUserLoggedIn() && !req.headers.has('Content-Type')) {
  //     req = req.clone({
  //       headers: req.headers.set('Content-Type', 'application/json')
  //     });
  //   }
  //
  //   req = this.addAuthenticationToken(req);
  //
  //   return next.handle(req).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error && error.status === 401) {
  //         // 401 errors are most likely going to be because we have an expired token that we need to refresh.
  //         if (this.refreshTokenInProgress) {
  //           // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
  //           // which means the new token is ready and we can retry the request again
  //           return this.refreshTokenSubject.pipe(
  //             filter(result => result !== null),
  //             take(1),
  //             switchMap(() => next.handle(this.addAuthenticationToken(req)))
  //           );
  //         } else {
  //           this.refreshTokenInProgress = true;
  //
  //           // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
  //           this.refreshTokenSubject.next(null);
  //
  //           return this.refreshAccessToken().pipe(
  //             switchMap((success: boolean) => {
  //               this.refreshTokenSubject.next(success);
  //               return next.handle(this.addAuthenticationToken(req));
  //             }),
  //             // When the call to refreshToken completes we reset the refreshTokenInProgress to false
  //             // for the next time the token needs to be refreshed
  //             finalize(() => this.refreshTokenInProgress = false)
  //           );
  //         }
  //       } else {
  //         return throwError(error);
  //       }
  //     })
  //   );
  // }
  //
  // private refreshAccessToken(): Observable<any> {
  //   return of('secret token');
  // }
  //
  // private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
  //   // If we do not have a token yet then we should not set the header.
  //   // Here we could first retrieve the token from where we store it.
  //   if (!this.auth.TOKEN_SESSION_ATTRIBUTE_NAME) {
  //     return request;
  //   }
  //   // If you are calling an outside domain then do not add the token.
  //   if (!request.url.match(/www.mydomain.com\//)) {
  //     return request;
  //   }
  //   return request.clone({
  //     headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.auth.TOKEN_SESSION_ATTRIBUTE_NAME)
  //   });
  // }
}
