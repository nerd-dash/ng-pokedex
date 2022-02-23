import { InjectionToken } from '@angular/core';
import { FetchService } from 'src/app/models/FetchService';
import Pokemon from '../../models/Pokemon';

export const POKEMON_FETCH_SERVICE = new InjectionToken<FetchService<Pokemon>>(
  'pokemon-fetch-service'
);
