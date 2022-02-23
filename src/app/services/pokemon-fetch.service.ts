import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FetchService } from '../models/FetchService';
import Pokemon from '../models/Pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonFetchService implements FetchService<Pokemon> {
  private POKE_SERVER_BASE_URL = environment.POKE_SERVER_BASE_URL;

  constructor(private httpClient: HttpClient) {}

  get$ = (id: number) =>
    this.httpClient.get<Pokemon>(`${this.POKE_SERVER_BASE_URL}/${id}`);

  getAll$ = () => this.httpClient.get<Pokemon[]>(this.POKE_SERVER_BASE_URL);

  put$ = (entity: Pokemon) =>
    this.httpClient.put<Pokemon>(`${this.POKE_SERVER_BASE_URL}/${entity.id}`, {
      ...entity,
    });
}