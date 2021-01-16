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
  public findAll(): Observable<any> {
    return this.http.get<any>(this.userUrl);
  }

  public save(user: User): Observable<any> {
    return this.http.post<any>(this.userUrl, user);
  }

  public update(user: User): Observable<any> {
    return this.http.put<any>(this.userUrl, user );
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.userUrl}/${id}` );
  }
  public getByEmail(email: string, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get(`${this.userUrl}/${email}`, { headers, responseType: 'text' as 'json' } );
  }
  // tslint:disable-next-line:typedef
  public delete(id: number ) {
    return this.http.delete(`${this.userUrl}/${id}`);
  }
}
