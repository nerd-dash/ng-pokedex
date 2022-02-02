interface Pokemon {
  id: number;
  image: string;
  seen: boolean;
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