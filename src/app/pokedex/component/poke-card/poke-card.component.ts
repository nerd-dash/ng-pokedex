import { Component, Input, OnInit } from '@angular/core';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent implements OnInit {
  @Input() public poke: Pokemon = EMPTY_POKEMON;

  constructor() {}

  ngOnInit(): void {}
}
