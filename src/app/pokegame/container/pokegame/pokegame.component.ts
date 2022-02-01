import { Component, Inject, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import Pokemon from 'src/app/models/Pokemon';
import { FetchService } from 'src/app/services/fetch.service.interface';
import { FETCH_SERVICE } from 'src/app/services/fetch.service.token';

@Component({
  selector: 'app-pokegame',
  templateUrl: './pokegame.component.html',
  styleUrls: ['./pokegame.component.scss'],
})
export class PokegameComponent implements OnInit {
  public randomPoke$: Observable<Pokemon> = of(<Pokemon>{});

  constructor(@Inject(FETCH_SERVICE) private pokeFetchService: FetchService) {}

  ngOnInit(): void {
    this.randomPoke$ = this.pokeFetchService.getAll$().pipe(); //TODO
  }
}
