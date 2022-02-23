import { InjectionToken } from '@angular/core';
import { GameStateService } from '../../models/GameStateService';
import Pokemon from '../../models/Pokemon';

export const POKEMON_GAME_STATE_SERVICE = new InjectionToken<
  GameStateService<Pokemon>
>('pokemon-game-state-service');
