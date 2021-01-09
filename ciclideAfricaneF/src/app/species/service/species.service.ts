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

  public save(species: Species): Observable<any> {
    return this.http.post<any>(this.speciesUrl, species);
  }

  public update(species: Species): Observable<any> {
    return this.http.put<any>(this.speciesUrl, species );
  }

  public getById(id: number): Observable<any> {
    return this.http.get(`${this.speciesUrl}/${id}` );
  }
  // tslint:disable-next-line:typedef
  public delete(id: number ) {
    return this.http.delete(`${this.speciesUrl}/${id}`);
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
