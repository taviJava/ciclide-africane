import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(public auth: AuthService) {}



intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isUserLoggedIn() && req.url.indexOf('login') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.auth.getToken()}`
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }



}
