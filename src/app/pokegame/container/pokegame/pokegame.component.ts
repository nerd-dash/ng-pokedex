import { Component, Inject, OnInit } from '@angular/core';

import { combineLatestWith, map, Observable, of } from 'rxjs';
import { Environment } from 'src/app/models/Environment';
import { GameStateService } from 'src/app/models/GameStateService';
import Pokemon from 'src/app/models/Pokemon';
import { Sighting } from 'src/app/models/Sighting';
import { ENVIRONMENT } from 'src/app/tokens/game-state/environment.token';
import { POKEMON_GAME_STATE_SERVICE } from 'src/app/tokens/game-state/pokemon-game-state-service.token';
import { SIGHTING_GAME_STATE_SERVICE } from 'src/app/tokens/game-state/sighting-game-state-service.token';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pokegame',
  templateUrl: './pokegame.component.html',
  styleUrls: ['./pokegame.component.scss'],
})
export class PokegameComponent implements OnInit {
  initializer$: Observable<void> = of();

  constructor(
    @Inject(POKEMON_GAME_STATE_SERVICE)
    private pokegameStateService: GameStateService<Pokemon>,
    @Inject(SIGHTING_GAME_STATE_SERVICE)
    private sightingGameStateService: GameStateService<Sighting>
  ) {}

  ngOnInit(): void {
    this.initializer$ = this.pokegameStateService.initiateState$().pipe(
      combineLatestWith(this.sightingGameStateService.initiateState$()),
      map(([gameStateInitialized, _]) => gameStateInitialized)
    );
  }
}
