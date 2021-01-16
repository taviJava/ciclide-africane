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
  public findAll(token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<any>(this.speciesUrl, {responseType: 'text' as 'json' });
  }

  public save(species: Species, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post<any>(this.speciesUrl, species , {responseType: 'text' as 'json' });
  }

  public update(species: Species): Observable<any> {
    return this.http.put<any>(this.speciesUrl, species );
  }

  public getById(id: number, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get(`${this.speciesUrl}/${id}` , {responseType: 'text' as 'json' });
  }
  // tslint:disable-next-line:typedef
  public delete(id: number, token: string ) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.delete(`${this.speciesUrl}/${id}` , {responseType: 'text' as 'json' });
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
  getFiles(token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get(this.photoUrl , {responseType: 'text' as 'json' }); }

getSpeciesphotos(id: number , token: string): Observable<any> {
  const tokenStr = 'Bearer ' + token;
  const headers = new HttpHeaders().set('Authorization', tokenStr);
  return this.http.get(`${this.speciesUrl}/photos/${id}` , {responseType: 'text' as 'json' });
}
}
