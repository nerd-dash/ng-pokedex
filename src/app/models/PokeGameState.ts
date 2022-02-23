import { GameState } from './GameState';
import Pokemon from './Pokemon';
import { Sighting } from './Sighting';
import { User } from './User';

export interface PokeGameState {
  pokemonState: GameState<Pokemon>;
  userState: GameState<User>;
  sightingState: GameState<Sighting>;
}
