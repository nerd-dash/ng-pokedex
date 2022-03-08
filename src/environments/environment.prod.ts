import { Environment, Environments } from 'src/app/models/Environment';

const SERVER_BASE_URL = 'http://localhost:3000';

export const environment: Environment = {
  production: true,
  POKEMON_SERVER_BASE_URL: `https://pokeapi.co/api/v2/pokemon`,
  LOGIN_SERVER_BASE_URL: SERVER_BASE_URL,
  SIGHTING_SERVER_BASE_URL: `${SERVER_BASE_URL}/sighting`,
  name: Environments.PRODUCITON,
  PROVIDERS: [],
};
