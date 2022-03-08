import { Provider } from '@angular/core';

export interface Environment {
  production: boolean;
  name: Environments;
  POKEMON_SERVER_BASE_URL: string;
  LOGIN_SERVER_BASE_URL: string;
  SIGHTING_SERVER_BASE_URL: string;
  PROVIDERS: Provider[];
}

export enum Environments {
  PRODUCITON = 'produciton',
  DEV = 'dev',
  INTEGRATION = 'integration',
}
