import { Component, Input, OnInit } from '@angular/core';
import Pokemon from 'src/app/models/Pokemon';

@Component({
  selector: 'app-poke-card',
  templateUrl: './poke-card.component.html',
  styleUrls: ['./poke-card.component.scss'],
})
export class PokeCardComponent implements OnInit {
  @Input() public poke: Pokemon = <Pokemon>{};

  constructor() {}

  ngOnInit(): void {}
}
