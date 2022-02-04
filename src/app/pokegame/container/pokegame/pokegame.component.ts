import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { FetchService } from 'src/app/services/fetch.service.interface';
import { FETCH_SERVICE } from 'src/app/services/fetch.service.token';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-pokegame',
  templateUrl: './pokegame.component.html',
  styleUrls: ['./pokegame.component.scss'],
})
export class PokegameComponent implements OnInit {
  public randomPoke$: Observable<Pokemon> = of(EMPTY_POKEMON);

  constructor(
    @Inject(FETCH_SERVICE) private pokeFetchService: FetchService<Pokemon>, private utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.randomPoke$ = this.pokeFetchService
      .getAll$()
      .pipe(
        map((pokes) => this.findRandomPokemon(this.filterUnseendPokemon(pokes)))
      );
  }

  private filterUnseendPokemon = (pokes: Pokemon[]): Pokemon[] =>
    pokes.filter((poke) => !poke.seen);

  private findRandomPokemon = (pokes: Pokemon[]): Pokemon =>
    pokes[this.utils.getRandomIndex<Pokemon>(pokes)];
}
