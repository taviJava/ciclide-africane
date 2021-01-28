import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Link} from '../model/link';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private photoUrl: string;
  private linkUrl: string;

  constructor(private http: HttpClient) {
    this.linkUrl = 'http://localhost:8080/link';
    this.photoUrl = 'http://localhost:8080/photos/link';
  }
  public findAll(): Observable<any> {
    return this.http.get<any>(this.linkUrl, {responseType: 'text' as 'json'} );
  }

  // tslint:disable-next-line:typedef
  public save(link: Link): Observable<any> {
    return this.http.post<any>(this.linkUrl, link, {responseType: 'text' as 'json'});
  }
  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.linkUrl}/${id}`);
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
