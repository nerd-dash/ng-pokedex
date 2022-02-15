import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FetchService } from '../models/FetchService';
import { GameStateService } from '../models/GameStateService';
import Pokemon, { EMPTY_POKEMON } from '../models/Pokemon';
import { FETCH_SERVICE } from '../tokens/fetch.service.token';

@Injectable()
export class PokemonGameStateService implements GameStateService<Pokemon> {
  private getRandomPokemon: BehaviorSubject<Pokemon> =
    new BehaviorSubject<Pokemon>(EMPTY_POKEMON);

  public getRandom$: Observable<Pokemon> = this.getRandomPokemon.asObservable();

  constructor(
    @Inject(FETCH_SERVICE) private pokeFetchService: FetchService<Pokemon>
  ) {}

  getNextRound = () => {
    this.pokeFetchService
      .getNextRandom$()
      .subscribe((randomPokemon) => this.getRandomPokemon.next(randomPokemon));
  };

  verify$ = (toBeTested: Partial<Pokemon>, verified: Pokemon) => {
    if (this.verify(toBeTested, verified)) {
      const seenPoke: Pokemon = { ...this.getRandomPokemon.value, seen: true };
      this.getRandomPokemon.next(seenPoke);
      this.pokeFetchService.put$(seenPoke).subscribe();
      return of(true);
    }
    this.getNextRound();

    return of(false);
  };

  private verify = (toBeTested: Partial<Pokemon>, verified: Pokemon): boolean =>
    toBeTested?.name?.toLocaleLowerCase() || verified?.name?.toLocaleLowerCase()
      ? toBeTested?.name?.toLocaleLowerCase() ===
        verified?.name?.toLocaleLowerCase()
      : false;
}
