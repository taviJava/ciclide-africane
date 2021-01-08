import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Galery} from '../model/galery';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private galleryUrl: string;

  constructor(private http: HttpClient) {
    this.galleryUrl = 'http://localhost:8080/galery';

  }
  public findAll(): Observable<Galery[]> {
      return this.http.get<Galery[]>(this.galleryUrl);
    }

    // tslint:disable-next-line:typedef
  public save(galery: Galery) {
      return this.http.post<Galery>(this.galleryUrl, galery);
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

}
