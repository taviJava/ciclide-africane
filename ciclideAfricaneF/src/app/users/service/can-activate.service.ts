import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateService implements CanActivate{
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
      if (!this.auth.isUserLoggedIn()) {
        this.router.navigate(['']);
        return false;
      }
      if (!this.auth.isUserAdm()){
        this.router.navigate(['']);
        return false;
      }
      return true;
  }
}
