import { InjectionToken } from '@angular/core';
import { GameStateService } from '../models/GameStateService';


export const GAME_STATE_SERVICE = new InjectionToken<GameStateService>('game-state-service');