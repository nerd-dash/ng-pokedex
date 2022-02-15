import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map, multicast, Observable, of, shareReplay, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FetchService } from '../models/FetchService';
import Pokemon, { EMPTY_POKEMON } from '../models/Pokemon';
import { UtilsService } from './utils.service';

@Injectable()
export class PokeFetchService implements FetchService<Pokemon> {
  private POKE_SERVER_BASE_URL = environment.POKE_SERVER_BASE_URL;

  constructor(
    private httpClient: HttpClient,
    private utilService: UtilsService
  ) {}

  private unseenPokeHttpParams: HttpParams =
    environment.UNSEEN_POKE_QUERY_PARAMS;
  private unseenPokemonCount: number = environment.INTIAL_UNSEEN_POKE_COUNT;

  get$ = (id: number) =>
    this.httpClient.get<Pokemon>(`${this.POKE_SERVER_BASE_URL}/${id}`);

  getAll$ = (params?: HttpParams) =>
    this.httpClient
      .get<Pokemon[]>(this.POKE_SERVER_BASE_URL, {
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const count =
            response.headers.get(environment.COUNT_HEADER_NAME) ||
            `${environment.INTIAL_UNSEEN_POKE_COUNT}`;
          this.unseenPokemonCount = +count;
          return response.body || [EMPTY_POKEMON];
        }),
        finalize(() => console.log('completed getAll$'))
      );

  put$ = (entity: Pokemon) =>
    this.httpClient.put<Pokemon>(`${this.POKE_SERVER_BASE_URL}/${entity.id}`, {
      ...entity,
    }).pipe(finalize(() => console.log('completed put$')));

  getNextRandom$ = () => {
    const params = this.unseenPokeHttpParams.set(
      environment.PAGE_QUERY_PARAM_KEY,
      this.getRandomUnseenPokemon()
    );
    return this.getAll$(params).pipe(
      map((pokes) => pokes.shift() || EMPTY_POKEMON)
    );
  };

  private getRandomUnseenPokemon = (): number =>
    this.utilService.getRandomNumber(this.unseenPokemonCount, 1);
}
