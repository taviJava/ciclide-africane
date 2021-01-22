import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Galery} from '../../gallery/model/galery';
import {HomePage} from '../model/home-page';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  private homepageUrl: string;
  private photoUrl: string;

  constructor(private http: HttpClient) {
    this.homepageUrl = 'http://localhost:8080/homepage';
    this.photoUrl = 'http://localhost:8080/photos/homepage';
  }
  public findAll(): Observable<any> {
    return this.http.get<any>(this.homepageUrl, {responseType: 'text' as 'json'} );
  }

  // tslint:disable-next-line:typedef
  public save(homePage: HomePage): Observable<any> {
    return this.http.post<any>(this.homepageUrl, homePage, {responseType: 'text' as 'json'});
  }
  // tslint:disable-next-line:typedef
  public delete(id: number) {
    return this.http.delete(`${this.homepageUrl}/${id}`);
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
    return this.http.get(this.homepageUrl);

  }

  getHomepagephotos(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/photos/homepage/${id}`);
  }
}
