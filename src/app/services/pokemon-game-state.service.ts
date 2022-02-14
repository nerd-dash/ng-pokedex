import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subject, tap } from 'rxjs';
import Pokemon, { EMPTY_POKEMON } from '../models/Pokemon';
import { FetchService } from '../models/FetchService';
import { FETCH_SERVICE } from '../tokens/fetch.service.token';
import { GameStateService } from '../models/GameStateService';
import { UtilsService } from './utils.service';

@Injectable()
export class PokemonGameStateService implements GameStateService<Pokemon> {

  private getRandomPokemon: BehaviorSubject<Pokemon> = new BehaviorSubject<Pokemon>(EMPTY_POKEMON);
  public getRandom$: Observable<Pokemon> = this.getRandomPokemon.asObservable();

  constructor(@Inject(FETCH_SERVICE) private pokeFetchService: FetchService<Pokemon>, private utils: UtilsService) { }

  getNextRound = () => {
    this.pokeFetchService
      .getAll$()
      .pipe(
        map((pokes) =>
          (this.findRandomPokemon(this.filterUnseendPokemon(pokes))))
        ).subscribe(poke => this.getRandomPokemon.next(poke));


  };


  verify$ = (toBeTested: Partial<Pokemon>, verified: Pokemon) => {
    if (this.verify(toBeTested, verified)) {

      const seenPoke : Pokemon = {...this.getRandomPokemon.value, seen: true};
      this.getRandomPokemon.next(seenPoke);
      this.pokeFetchService.put$(seenPoke).subscribe();
      return of(true);

    }
    this.getNextRound();

    return of(false);
  }




  private filterUnseendPokemon = (pokes: Pokemon[]): Pokemon[] =>
    pokes.filter((poke) => !poke.seen);

  private findRandomPokemon = (pokes: Pokemon[]): Pokemon =>
    pokes[this.utils.getRandomIndex<Pokemon>(pokes)];


  private verify = (toBeTested: Partial<Pokemon>, verified: Pokemon): boolean => (toBeTested?.name?.toLocaleLowerCase() || verified?.name?.toLocaleLowerCase()) ? toBeTested?.name?.toLocaleLowerCase() === verified?.name?.toLocaleLowerCase() : false

}
