import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { FetchService } from 'src/app/models/FetchService';
import { FETCH_SERVICE } from 'src/app/tokens/fetch.service.token';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  public pokes$: Observable<Pokemon[]> = of([EMPTY_POKEMON]);

  constructor(
    @Inject(FETCH_SERVICE) private pokeFetchService: FetchService<Pokemon>
  ) {}

  ngOnInit(): void {
    this.pokes$ = this.pokeFetchService.getAll$();
  }
}
