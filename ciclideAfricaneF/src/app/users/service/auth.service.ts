import { Injectable } from '@angular/core';
import {User} from '../model/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user.service';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  TOKEN_SESSION_ATTRIBUTE_NAME = 'authenticatedUserToken';
  USER_DATA_SESSION_ATTRIBUTE_NAME = 'authenticatedUserData';


  public username: string;
  public password: string;
  public user: User = new User();
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public ret = false;
  public isPrivilege: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, public userService: UserService) {
  }
  authentication(user: User): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/login`, user);
  }


  // tslint:disable-next-line:typedef
  createBasicAuthToken() {
    return 'Bearer ' + this.TOKEN_SESSION_ATTRIBUTE_NAME;
  }
  // tslint:disable-next-line:typedef
  registerSuccessfulLogin(username) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem(this.TOKEN_SESSION_ATTRIBUTE_NAME, this.TOKEN_SESSION_ATTRIBUTE_NAME);
    this.userService.getByEmail(username).subscribe(data => {
      this.user = new User();
      this.user = JSON.parse(data) as User;
      this.isLoggedIn.next(true);
    });
  }

  // tslint:disable-next-line:typedef
  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.TOKEN_SESSION_ATTRIBUTE_NAME = 'null';
    sessionStorage.removeItem(this.TOKEN_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_DATA_SESSION_ATTRIBUTE_NAME);
    this.isLoggedIn.next(false);
    this.username = null;
    this.password = null;
  }

  // tslint:disable-next-line:typedef
  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) {
      this.isLoggedIn.next(false);
      return false;
    }
    this.isLoggedIn.next(true);
    return true;
  }
}
