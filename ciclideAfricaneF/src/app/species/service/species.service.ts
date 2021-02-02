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
  private speciesUrlAdm: string;
  constructor(private http: HttpClient) {
    this.speciesUrl = 'http://localhost:8080/species';
    this.photoUrl = 'http://localhost:8080/photos';
    this.speciesUrlAdm = 'http://localhost:8080/admspecies';
  }
  public findAll(): Observable<any> {
    return this.http.get<any>(this.speciesUrl, {responseType: 'text' as 'json' });
  }
  public search(keyword): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/find/search/${keyword}/list`, {responseType: 'text' as 'json' });
  }

  public save(species: Species, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post<any>(this.speciesUrlAdm, species , {headers, responseType: 'text' as 'json' });
  }

  public update(species: Species, token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.put<any>(this.speciesUrlAdm, species, {headers, responseType: 'text' as 'json' } );
  }

  public getById(id: number ): Observable<any> {
    return this.http.get(`${this.speciesUrl}/${id}` , {responseType: 'text' as 'json' });
  }
  // tslint:disable-next-line:typedef
  public delete(id: number, token: string ) {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.delete(`${this.speciesUrlAdm}/${id}` , {headers, responseType: 'text' as 'json' });
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
    return this.http.get(this.photoUrl); }

getSpeciesphotos(id: number ): Observable<any> {
  return this.http.get(`${this.speciesUrl}/photos/${id}`);
}
}
