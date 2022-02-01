import Pokemon from 'src/app/models/Pokemon';

export const pokes: Pokemon[] = [
  {
    id: 1,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    seen: false,
    name: 'Bulbasaur',
    type: ['Grass', 'Poison'],
    base: {
      hp: 45,
      attack: 49,
      defense: 49,
      speedAttack: 65,
      speedDefense: 65,
      speed: 45,
    },
  },
  {
    id: 2,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    seen: true,
    name: 'Ivysaur',
    type: ['Grass', 'Poison'],
    base: {
      hp: 60,
      attack: 62,
      defense: 63,
      speedAttack: 80,
      speedDefense: 80,
      speed: 60,
    },
  },
  {
    id: 3,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
    seen: false,
    name: 'Venusaur',
    type: ['Grass', 'Poison'],
    base: {
      hp: 80,
      attack: 82,
      defense: 83,
      speedAttack: 100,
      speedDefense: 100,
      speed: 80,
    },
  },
  {
    id: 4,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    seen: true,
    name: 'Charmander',
    type: ['Fire'],
    base: {
      hp: 39,
      attack: 52,
      defense: 43,
      speedAttack: 60,
      speedDefense: 50,
      speed: 65,
    },
  },
];
