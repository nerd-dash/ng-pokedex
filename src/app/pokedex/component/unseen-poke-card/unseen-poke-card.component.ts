import { Component } from '@angular/core';
import { PokeCardComponent } from '../poke-card/poke-card.component';

@Component({
  selector: 'app-unseen-poke-card',
  templateUrl: './unseen-poke-card.component.html',
  styleUrls: ['./unseen-poke-card.component.scss'],
})
export class UnseenPokeCardComponent extends PokeCardComponent {
  constructor() {
    super();
  }
}
