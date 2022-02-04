import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Pokemon from '../models/Pokemon';
import { FetchService } from './fetch.service.interface';

@Injectable()
export class PokeFetchService implements FetchService<Pokemon> {
  private POKE_SERVER_BASE_URL = environment.POKE_SERVER_BASE_URL;

  constructor(private httpClient: HttpClient) { }
  get$ = (id: number) =>
    this.httpClient.get<Pokemon>(`${this.POKE_SERVER_BASE_URL}/${id}`);

  getAll$ = () => this.httpClient.get<Pokemon[]>(this.POKE_SERVER_BASE_URL);
}
