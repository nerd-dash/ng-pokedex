import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchService } from 'src/app/models/FetchService';
import Pokemon from 'src/app/models/Pokemon';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonFetchService implements FetchService<Pokemon> {
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
    this.httpClient.get<Pokemon>(
      `${environment.POKEMON_SERVER_BASE_URL}/${id}`
    );

  getAll$ = () =>
    this.httpClient.get<Pokemon[]>(environment.POKEMON_SERVER_BASE_URL);

  put$ = (entity: Pokemon) =>
    this.httpClient.put<Pokemon>(
      `${environment.POKEMON_SERVER_BASE_URL}/${entity.id}`,
      {
        ...entity,
      }
    );
}
