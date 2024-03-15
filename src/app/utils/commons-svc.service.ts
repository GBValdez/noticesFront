import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

// Servicio generico para la gestión de entidades
@Injectable({
  providedIn: 'root',
})
export class CommonsSvcService<dto, dtoCreation> {
  protected urlBase: string = '';
  constructor(protected http: HttpClient) {}
  // Creacion de la url base para el consumo de los servicios
  set url(url: string) {
    this.urlBase = `${environment.api}/${url}`;
  }
  getMethod(): Observable<dto[]> {
    return this.http.get<dto[]>(this.urlBase);
  }
  getMethodById(id: number): Observable<dto> {
    return this.http.get<dto>(`${this.urlBase}/${id}`);
  }
  postMethod(body: dtoCreation): Observable<dto> {
    return this.http.post<dto>(this.urlBase, body);
  }
  putMethod(id: number, body: dtoCreation): Observable<dto> {
    return this.http.put<dto>(`${this.urlBase}/${id}`, body);
  }
  deleteMethod(id: number): Observable<dto> {
    return this.http.delete<dto>(`${this.urlBase}/${id}`);
  }
}
