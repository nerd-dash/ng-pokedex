import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';
import { PokedexEntry } from 'src/app/models/PokedexEntry';
import { POKEMON_GAME_STATE_SERVICE } from 'src/app/tokens/game-state/pokemon-game-state-service.token';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexComponent implements OnInit {
  public entry$: Observable<PokedexEntry[]> = of([]);

  constructor(
    @Inject(POKEMON_GAME_STATE_SERVICE)
    private gameStateService: GameStateService<PokedexEntry>
  ) {}

  ngOnInit(): void {
    this.entry$ = this.gameStateService.getAllItems$();
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
