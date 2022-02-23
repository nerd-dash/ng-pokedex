import { InjectionToken } from '@angular/core';
import { Sighting } from 'src/app/models/Sighting';
import { GameStateService } from '../../models/GameStateService';

export const SIGHTING_GAME_STATE_SERVICE = new InjectionToken<
  GameStateService<Sighting>
>('sighting-game-state-service');
