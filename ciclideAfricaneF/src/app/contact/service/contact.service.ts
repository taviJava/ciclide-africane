import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Species} from '../../species/model/species';
import {Contact} from '../model/contact';
import {Message} from '../model/message';
import {User} from "../../users/model/user";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl: string;
  private messageUrl: string;
  private contactUrlAdm: string;

  constructor(private http: HttpClient) {
    this.contactUrl = 'http://localhost:8080/contact';
    this.messageUrl = 'http://localhost:8080/message';
    this.contactUrlAdm = 'http://localhost:8080/admcontact';
  }
  public findAll(): Observable<any> {
    return this.http.get<any>(this.contactUrl, {responseType: 'text' as 'json' });
  }

  public save(contact: Contact , token: string ): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post<any>(this.contactUrlAdm, contact , {headers, responseType: 'text' as 'json' });
  }
  public sendMessage(message: Message): Observable<any> {
    return this.http.post<any>(this.messageUrl, message , {responseType: 'text' as 'json' });
  }
  public update(contact: Contact, token: string ): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.put<any>(this.contactUrlAdm, contact , {headers, responseType: 'text' as 'json' });
  }

  public getContact(): Observable<any> {
    return this.http.get(this.contactUrl , {responseType: 'text' as 'json' });
  }
  // tslint:disable-next-line:typedef
  public delete(id: number , token: string ) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.delete(`${this.contactUrlAdm}/${id}` , {headers, responseType: 'text' as 'json' });
  }
}
