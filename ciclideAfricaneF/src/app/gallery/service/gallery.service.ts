import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Galery} from '../model/galery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private galleryUrl: string;
  private photoUrl: string;

  constructor(private http: HttpClient) {
    this.galleryUrl = 'http://localhost:8080/galery123';
    this.photoUrl = 'http://localhost:8080/photos';

  }

  public findAll(token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<any>(this.galleryUrl, {headers, responseType: 'text' as 'json'});
  }

  // tslint:disable-next-line:typedef
  public save(galery: Galery, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post<any>(this.galleryUrl, galery, {headers, responseType: 'text' as 'json'});
  }

  // tslint:disable-next-line:typedef
  public update(galery: Galery, token: string) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.put<Galery>(this.galleryUrl, galery, {headers, responseType: 'text' as 'json'});
  }

  public getById(id: number, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get(`${this.galleryUrl}/${id}` , { headers, responseType: 'text' as 'json' } );
  }

  // tslint:disable-next-line:typedef
  public delete(id: number, token: string) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.delete(`${this.galleryUrl}/${id}`, { headers, responseType: 'text' as 'json' });
  }

  public upload(photo: File, token: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    formData.append('photo', photo);
    const req = new HttpRequest('POST', this.photoUrl,  formData, {
      reportProgress: true,
      responseType: 'text' as 'json'
    });
    return this.http.request(req);
  }

  getFiles( token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<any>(this.galleryUrl, {headers, responseType: 'text' as 'json'});

  }

  getGalleryphotos(id: number): Observable<any> {
    return this.http.get(`${this.galleryUrl}/photos/${id}`);
  }
}
