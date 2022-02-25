import Pokemon, { EMPTY_POKEMON } from './Pokemon';
import { Revealable } from './Revealable';

export interface PokedexEntry extends Pokemon {
  seen?: boolean;
}
export const EMPTY_POKEDEX_ENTRY = <PokedexEntry>{};
