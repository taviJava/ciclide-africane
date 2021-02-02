import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Distributor} from '../model/distributor';

@Injectable({
  providedIn: 'root'
})
export class DistributorsService {
  private distributorsUrl: string;
  private distributorsUrlAdm: string;
  constructor(private http: HttpClient) {
    this.distributorsUrl = 'http://localhost:8080/distributors';
    this.distributorsUrlAdm = 'http://localhost:8080/admdistributors';
  }
  public findAll(): Observable<any> {
    return this.http.get<any>(this.distributorsUrl, {responseType: 'text' as 'json' });
  }
  public save(distr: Distributor , token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post<any>(this.distributorsUrlAdm, distr , {headers, responseType: 'text' as 'json' });
  }

  // tslint:disable-next-line:typedef
  public delete(id: number , token: string) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.delete(`${this.distributorsUrlAdm}/${id}` , {headers, responseType: 'text' as 'json' });
  }
}
