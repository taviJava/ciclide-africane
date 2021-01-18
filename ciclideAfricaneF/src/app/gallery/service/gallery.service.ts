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
    this.photoUrl = 'http://localhost:8080/photos/galery';

  }

  public findAll(): Observable<any> {
    return this.http.get<any>(this.galleryUrl, {responseType: 'text' as 'json'} );
  }

  // tslint:disable-next-line:typedef
  public save(galery: Galery): Observable<any> {
    return this.http.post<any>(this.galleryUrl, galery, {responseType: 'text' as 'json'});
  }

  // tslint:disable-next-line:typedef
  public update(galery: Galery) {
    return this.http.put<Galery>(this.galleryUrl, galery, {responseType: 'text' as 'json'});
  }

  public getById(id: number ): Observable<any> {
    return this.http.get(`${this.galleryUrl}/${id}` , {responseType: 'text' as 'json'} );
  }

  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.galleryUrl}/${id}`);
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
    return this.http.get(this.galleryUrl);

  }

  getGalleryphotos(id: number): Observable<any> {
    return this.http.get(`${this.galleryUrl}/photos/${id}`);
  }
}
