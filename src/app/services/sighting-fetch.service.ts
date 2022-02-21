import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FetchService } from '../models/FetchService';
import { Sighting } from '../models/Sighting';

const sighting: Sighting = <Sighting>{};

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
  put$ = (entity: Sighting) =>
    this.httpClient.patch<Sighting>(
      `${environment.SERVER_BASE_URL}/sighting/${entity.id}`,
      { ...entity }
    );
}
