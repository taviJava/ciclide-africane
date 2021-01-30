import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Distributor} from '../model/distributor';

@Injectable({
  providedIn: 'root'
})
export class DistributorsService {
  private distributorsUrl: string;
  constructor(private http: HttpClient) {
    this.distributorsUrl = 'http://localhost:8080/distributors';
  }
  public findAll(): Observable<any> {
    return this.http.get<any>(this.distributorsUrl, {responseType: 'text' as 'json' });
  }
  public save(distr: Distributor): Observable<any> {
    return this.http.post<any>(this.distributorsUrl, distr , {responseType: 'text' as 'json' });
  }

  // tslint:disable-next-line:typedef
  public delete(id: number ) {
    return this.http.delete(`${this.distributorsUrl}/${id}` , {responseType: 'text' as 'json' });
  }
}
