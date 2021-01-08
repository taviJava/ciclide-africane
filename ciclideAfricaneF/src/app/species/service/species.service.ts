import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Species} from '../model/species';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private speciesUrl: string;
  private photoUrl: string;
  constructor(private http: HttpClient) {
    this.speciesUrl = 'http://localhost:8080/species';
    this.photoUrl = 'http://localhost:8080/photos';
  }
  public findAll(): Observable<any> {
    return this.http.get<any>(this.speciesUrl);
  }

  public save(species: Species, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post<any>(this.speciesUrl, species , { headers, responseType: 'text' as 'json' });
  }

  public update(species: Species, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.put<any>(this.speciesUrl, species , { headers, responseType: 'text' as 'json' });
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.speciesUrl}/${id}` );
  }
  // tslint:disable-next-line:typedef
  public delete(id: number , token: string) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.delete(`${this.speciesUrl}/${id}` , { headers, responseType: 'text' as 'json' });
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

getSpeciesphotos(id: number): Observable<any> {
  return this.http.get(`${this.speciesUrl}/photos/${id}`);
}
}
