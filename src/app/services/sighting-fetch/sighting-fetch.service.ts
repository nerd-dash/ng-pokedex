import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from 'src/app/models/FetchService';
import { Sighting } from 'src/app/models/Sighting';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SightingFetchService implements FetchService<Sighting> {
  constructor(private httpClient: HttpClient) {}
  getAll$ = (params?: HttpParams) =>
    this.httpClient.get<Sighting[]>(`${environment.SERVER_BASE_URL}/sighting`, {
      params,
    });
  get$ = (id: number) =>
    this.httpClient.get<Sighting>(
      `${environment.SERVER_BASE_URL}/sighting/${id}`
    );
  post$ = (entity: Sighting) =>
    this.httpClient.post<Sighting>(`${environment.SERVER_BASE_URL}/sighting/`, {
      ...entity,
    });

  put$ = (entity: Sighting) => {
    throw 'Method not allowed!';
  };
  patch$ = (entity: Sighting) => {
    throw 'Method not allowed!';
  };
  delete$ = (entity: Sighting) => {
    throw 'Method not allowed!';
  };
}
