import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { GameStateService } from 'src/app/services/game-state.service.interface';
import { GAME_STATE_SERVICE } from 'src/app/services/game-state.service.token';


@Component({
  selector: 'app-pokegame',
  templateUrl: './pokegame.component.html',
  styleUrls: ['./pokegame.component.scss'],
})
export class PokegameComponent implements OnInit {
  public randomPoke$: Observable<Pokemon | null> = of(null);

  constructor(@Inject(GAME_STATE_SERVICE) private gameStateService: GameStateService<Pokemon>) { }

  ngOnInit(): void {
    this.gameStateService.getNextRound();
    this.randomPoke$ = this.gameStateService.getRandom$;
  }


}
