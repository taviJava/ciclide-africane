import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl: string;
  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/users';
  }
  public findAll(token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    console.log(token);
    return this.http.get<any>(this.userUrl , {headers, responseType: 'text' as 'json' });
  }

  public save(user: User): Observable<any> {
    return this.http.post<any>('http://localhost:8080/register', user , { responseType: 'text' as 'json' });
  }

  public update(user: User, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.put<any>(this.userUrl, user, {headers, responseType: 'text' as 'json' });
  }

  public getById(id: number, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get(`http://localhost:8080/userbyid/${id}` , {headers, responseType: 'text' as 'json' });
  }
  public getByEmail(email: string, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get(`${this.userUrl}/${email}` , {headers, responseType: 'text' as 'json' });
  }
  // tslint:disable-next-line:typedef
  public delete(id: number , token: string) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.delete(`${this.userUrl}/${id}` , {headers, responseType: 'text' as 'json' });
  }
}
