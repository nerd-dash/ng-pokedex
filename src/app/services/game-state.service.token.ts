import { InjectionToken } from '@angular/core';
import { GameStateService } from './game-state.service.interface';


export const GAME_STATE_SERVICE = new InjectionToken<GameStateService>('verification-service');