import { Inject, Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { FetchService } from '../models/FetchService';
import { GameState } from '../models/GameState';
import { GameStateService } from '../models/GameStateService';
import { PokedexEntry } from '../models/PokedexEntry';
import Pokemon, { EMPTY_POKEMON } from '../models/Pokemon';
import { Sighting } from '../models/Sighting';
import { POKEMON_FETCH_SERVICE } from '../tokens/fetch/pokemon-fetch-service.token';
import { SIGHTING_GAME_STATE_SERVICE } from '../tokens/game-state/sighting-game-state-service.token';
import { StateService } from './state.service';
import { UtilsService } from './utils.service';

const initialState: GameState<PokedexEntry> = {
  allItems: [],
  item: EMPTY_POKEMON,
};

@Injectable({
  providedIn: 'root',
})
export class PokemonGameStateService
  extends StateService<GameState<PokedexEntry>>
  implements GameStateService<PokedexEntry>
{
  constructor(
    @Inject(POKEMON_FETCH_SERVICE)
    private pokemonFetchService: FetchService<Pokemon>,
    @Inject(SIGHTING_GAME_STATE_SERVICE)
    private sightingGameStateService: GameStateService<Sighting>,
    private utilService: UtilsService
  ) {
    super(initialState);
    this.init();
  }

  getItem$ = () => this.select((state) => state.item);

  getAllItems$ = () => this.select((state) => state.allItems);

  verifyItems = (toBeTested: Partial<PokedexEntry>) => {
    if (
      this.utilService.hasTheSameName<PokedexEntry>(toBeTested, this.state.item)
    ) {
      this.updateSeenPokemon(this.state.item);
      this.sightingGameStateService
        .updateItem$({ id: 0, pokemonId: this.state.item.id })
        .subscribe();
      return true;
    }

    this.getRandomUnseen();
    return false;
  };

  getNextItem = () => this.getRandomUnseen();

  private init = (): void => {
    const pokedexEntries$ = zip(
      this.pokemonFetchService.getAll$(),
      this.sightingGameStateService.getAllItems$()
    );
    pokedexEntries$.subscribe((entries) => {
      const [pokemons, sightings] = entries;
      const allItems = this.convertPokemonToPokedexEntries({
        pokemons,
        sightings,
      });
      this.setState({
        ...this.state,
        allItems,
      });

      this.getRandomUnseen();
    });
  };

  private getRandomUnseen = () => {
    const unseenPokemons = this.state.allItems.filter((poke) => !poke.seen);
    const item = this.utilService.getRandomItem(unseenPokemons);
    this.setState({ ...this.state, item });
  };

  updateItem$ = (item: PokedexEntry) => this.pokemonFetchService.put$(item);

  private convertPokemonToPokedexEntries = ({
    pokemons,
    sightings,
  }: {
    pokemons: Pokemon[];
    sightings: Sighting[];
  }): PokedexEntry[] =>
    pokemons.map((poke) =>
      sightings.find((sigh) => sigh.pokemonId === poke.id)
        ? { ...poke, seen: true }
        : { ...poke, seen: false }
    );

  private updateSeenPokemon = (item: PokedexEntry) => {
    this.setState({
      item: item,
      allItems: this.state.allItems.map((poke) =>
        item.id === poke.id ? item : poke
      ),
    });
  };
}
