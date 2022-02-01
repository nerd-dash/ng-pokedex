import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Pokemon from '../models/Pokemon';
import { FetchService } from './fetch.service.interface';

@Injectable()
export class PokeFetchService implements FetchService<Pokemon> {
  private POKE_SERVER_BASE_URL = 'http://localhost:3000/pokemon';

  constructor(private httpClient: HttpClient) {}
  get$ = (id: number) =>
    this.httpClient.get<Pokemon>(`${this.POKE_SERVER_BASE_URL}/${id}`);

  getAll$ = () => this.httpClient.get<Pokemon[]>(this.POKE_SERVER_BASE_URL);
}
