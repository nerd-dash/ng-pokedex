import { Component, Input, OnInit } from '@angular/core';
import { EMPTY_POKEDEX_ENTRY, PokedexEntry } from 'src/app/models/PokedexEntry';
import Pokemon from 'src/app/models/Pokemon';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent implements OnInit, PokeCardComponentInterface {
  @Input() public poke: PokedexEntry = EMPTY_POKEDEX_ENTRY;

  constructor() {}

  ngOnInit(): void {}
}

export interface PokeCardComponentInterface {
  poke: PokedexEntry;
}
