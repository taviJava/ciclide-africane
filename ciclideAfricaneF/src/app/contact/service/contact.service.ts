import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Species} from '../../species/model/species';
import {Contact} from '../model/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl: string;

  constructor(private http: HttpClient) {
    this.contactUrl = 'http://localhost:8080/contact';
  }
  public findAll(): Observable<any> {
    return this.http.get<any>(this.contactUrl, {responseType: 'text' as 'json' });
  }

  public save(contact: Contact): Observable<any> {
    return this.http.post<any>(this.contactUrl, contact , {responseType: 'text' as 'json' });
  }

  public update(contact: Contact): Observable<any> {
    return this.http.put<any>(this.contactUrl, contact );
  }

  public getContact(): Observable<any> {
    return this.http.get(this.contactUrl , {responseType: 'text' as 'json' });
  }
  // tslint:disable-next-line:typedef
  public delete(id: number ) {
    return this.http.delete(`${this.contactUrl}/${id}` , {responseType: 'text' as 'json' });
  }
}
