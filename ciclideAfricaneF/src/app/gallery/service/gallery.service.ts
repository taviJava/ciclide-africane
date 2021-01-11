import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
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
  public findAll(): Observable<any> {
      return this.http.get<any>(this.galleryUrl);
    }

    // tslint:disable-next-line:typedef
  public save(galery: Galery): Observable<any> {
      return this.http.post<any>(this.galleryUrl, galery);
    }

    // tslint:disable-next-line:typedef
  public update(galery: Galery) {
      return this.http.put<Galery>(this.galleryUrl, galery);
    }

  public getById(id: number): Observable<any> {
      return this.http.get(`${this.galleryUrl}/${id}`);
    }

    // tslint:disable-next-line:typedef
  public delete(id: number) {
      return this.http.delete(`${this.galleryUrl}/${id}`);
    }
  public upload(photo: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    const req = new HttpRequest('POST', this.photoUrl, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(this.photoUrl); }

  getGalleryphotos(id: number): Observable<any> {
    return this.http.get(`${this.galleryUrl}/photos/${id}`);
  }
}
