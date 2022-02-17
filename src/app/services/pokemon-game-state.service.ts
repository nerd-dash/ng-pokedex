import { Inject, Injectable } from '@angular/core';
import { FetchService } from '../models/FetchService';
import { GameState } from '../models/GameState';
import { GameStateService } from '../models/GameStateService';
import Pokemon, { EMPTY_POKEMON } from '../models/Pokemon';
import { FETCH_SERVICE } from '../tokens/fetch.service.token';
import { StateService } from './state.service';
import { UtilsService } from './utils.service';

const initialState: GameState<Pokemon> = {
  allItems: [],
  item: EMPTY_POKEMON,
};

@Injectable({
  providedIn: 'root',
})
export class PokemonGameStateService
  extends StateService<GameState<Pokemon>>
  implements GameStateService<Pokemon>
{
  constructor(
    @Inject(FETCH_SERVICE) private pokeFetchService: FetchService<Pokemon>,
    private utilService: UtilsService
  ) {
    super(initialState);
    this.init();
  }

  getItem$ = () => this.select((state) => state.item);

  getAllItems$ = () => this.select((state) => state.allItems);

  verifyItems = (toBeTested: Partial<Pokemon>, verified: Pokemon) => {
    if (this.utilService.hasTheSameName<Pokemon>(toBeTested, verified)) {
      const seenPoke: Pokemon = {
        ...this.state.item,
        seen: true,
      };
      this.updateSeenPokemon(seenPoke);
      return true;
    }

    this.getRandomUnseen();
    return false;
  };

  getNextItem = () => this.getRandomUnseen();

  private init = (): void => {
    this.pokeFetchService.getAll$().subscribe((allItems) => {
      this.setState({ allItems });
      this.getRandomUnseen();
    });
  };

  private getRandomUnseen = () => {
    const unseenPokemons = this.state.allItems.filter((poke) => !poke.seen);
    const item = this.utilService.getRandomItem(unseenPokemons);
    this.setState({ item });
  };

  private updateSeenPokemon = (seenPokemon: Pokemon) => {
    this.setState({
      item: seenPokemon,
      allItems: this.state.allItems.map((poke) =>
        seenPokemon.id === poke.id ? seenPokemon : poke
      ),
    });
    this.pokeFetchService.put$(seenPokemon).subscribe();
  };
}
