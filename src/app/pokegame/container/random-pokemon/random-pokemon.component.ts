import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';
import { EMPTY_POKEDEX_ENTRY, PokedexEntry } from 'src/app/models/PokedexEntry';
import Pokemon from 'src/app/models/Pokemon';
import { POKEMON_GAME_STATE_SERVICE } from 'src/app/tokens/game-state/pokemon-game-state-service.token';

@Component({
  selector: 'app-random-pokemon',
  templateUrl: './random-pokemon.component.html',
  styleUrls: ['./random-pokemon.component.scss'],
})
export class RandomPokemonComponent implements OnInit {
  public randomPoke$: Observable<PokedexEntry> = of();
  public EMPTY_POKEDEX_ENTRY = EMPTY_POKEDEX_ENTRY;

  constructor(
    @Inject(POKEMON_GAME_STATE_SERVICE)
    private gameStateService: GameStateService<Pokemon>
  ) {}

  ngOnInit(): void {
    this.randomPoke$ = this.gameStateService.getItem$();
  }
}
