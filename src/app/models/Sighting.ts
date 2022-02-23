import { Identificable } from './Identificable';
import { Ownable } from './Ownable';

export interface Sighting extends Identificable, Ownable {
  pokemonId: number;
}
export const EMPTY_SIGHTING = <Sighting>{};
