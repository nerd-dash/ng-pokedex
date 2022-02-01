import { Component } from '@angular/core';
import { PokeCardComponent } from '../poke-card/poke-card.component';

@Component({
  selector: 'app-seen-poke-card',
  templateUrl: './seen-poke-card.component.html',
  styleUrls: ['./seen-poke-card.component.scss'],
})
export class SeenPokeCardComponent extends PokeCardComponent {
  constructor() {
    super();
  }
}
