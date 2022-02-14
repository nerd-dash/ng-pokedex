import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnseenPokeCardComponent } from './unseen-poke-card/unseen-poke-card.component';
import { SeenPokeCardComponent } from './seen-poke-card/seen-poke-card.component';
import { PokeCardComponent } from './poke-card/poke-card.component';


@NgModule({
  declarations: [
    PokeCardComponent,
    SeenPokeCardComponent,
    UnseenPokeCardComponent,
  ],
  exports: [
    PokeCardComponent,
    UnseenPokeCardComponent,
    SeenPokeCardComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class PokeCardModule { }
