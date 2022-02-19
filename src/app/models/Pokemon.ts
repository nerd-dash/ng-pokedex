import { Identificable } from './Identificable';
import { Revealable } from './Revealable';

interface Pokemon extends Identificable, Revealable {
  image: string;
  name: string;
  type: string[];
  base: {
    hp: number;
    attack: number;
    defense: number;
    speedAttack: number;
    speedDefense: number;
    speed: number;
  };
}

export default Pokemon;
export const EMPTY_POKEMON = <Pokemon>{};
