import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';
import Pokemon from 'src/app/models/Pokemon';
import { GAME_STATE_SERVICE } from 'src/app/tokens/game-state.service.token';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokedexComponent implements OnInit {
  public pokes$: Observable<Pokemon[]> = of([]);

  constructor(
    @Inject(GAME_STATE_SERVICE)
    private gameStateService: GameStateService<Pokemon>
  ) {}

  ngOnInit(): void {
    this.pokes$ = this.gameStateService.getAllItems$();
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
