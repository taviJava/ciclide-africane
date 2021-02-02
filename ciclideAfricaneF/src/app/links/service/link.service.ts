import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Link} from '../model/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private photoUrl: string;
  private linkUrl: string;
  private linkUrlAdm: string;

  constructor(private http: HttpClient) {
    this.linkUrl = 'http://localhost:8080/link';
    this.photoUrl = 'http://localhost:8080/photos/link';
    this.linkUrlAdm = 'http://localhost:8080/admlink';
  }
  public findAll(): Observable<any> {
    return this.http.get<any>(this.linkUrl, {responseType: 'text' as 'json'} );
  }

  // tslint:disable-next-line:typedef
  public save(link: Link, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post<any>(this.linkUrlAdm, link, {headers, responseType: 'text' as 'json'});
  }
  // tslint:disable-next-line:typedef
  public delete(id: number, token: string) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.delete(`${this.linkUrlAdm}/${id}`, {headers, responseType: 'text' as 'json'});
  }
  public upload(photo: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    const req = new HttpRequest('POST', this.photoUrl,  formData, {
      reportProgress: true,
      responseType: 'text' as 'json'
    });
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.linkUrl);

  }

  getLinkphotos(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/link/photos/${id}`);
  }
}
