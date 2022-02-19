import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { GAME_STATE_SERVICE } from 'src/app/tokens/game-state.service.token';

@Component({
  selector: 'app-random-pokemon',
  templateUrl: './random-pokemon.component.html',
  styleUrls: ['./random-pokemon.component.scss'],
})
export class RandomPokemonComponent implements OnInit {
  public randomPoke$: Observable<Pokemon> = of();
  public EMPTY_POKEMON = EMPTY_POKEMON;

  constructor(
    @Inject(GAME_STATE_SERVICE)
    private gameStateService: GameStateService<Pokemon>
  ) {}

  ngOnInit(): void {
    this.randomPoke$ = this.gameStateService.getItem$();
  }
}