import { InjectionToken } from '@angular/core';
import { CanActivate } from '@angular/router';

export const POKEMON_CAN_ACTIVATE = new InjectionToken<CanActivate>(
  'pokemon-can-activate'
);
