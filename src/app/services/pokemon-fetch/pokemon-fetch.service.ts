import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FetchService } from 'src/app/models/FetchService';
import Pokemon from 'src/app/models/Pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonFetchService implements FetchService<Pokemon> {
  private POKE_SERVER_BASE_URL = environment.POKE_SERVER_BASE_URL;

  constructor(private httpClient: HttpClient) {}

  post$ = (entity: Pokemon) => {
    throw 'Method not allowed!';
  };
  patch$ = (entity: Pokemon) => {
    throw 'Method not allowed!';
  };
  delete$ = (entity: Pokemon) => {
    throw 'Method not allowed!';
  };

  get$ = (id: number) =>
    this.httpClient.get<Pokemon>(`${this.POKE_SERVER_BASE_URL}/${id}`);

  getAll$ = () => this.httpClient.get<Pokemon[]>(this.POKE_SERVER_BASE_URL);

  put$ = (entity: Pokemon) =>
    this.httpClient.put<Pokemon>(`${this.POKE_SERVER_BASE_URL}/${entity.id}`, {
      ...entity,
    });
}
