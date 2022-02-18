import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LazyImgDirectiveModule } from 'src/app/directives/lazy-img.directive.module';
import { PokeCardComponent } from './poke-card/poke-card.component';
import { SeenPokeCardComponent } from './seen-poke-card/seen-poke-card.component';
import { UnseenPokeCardComponent } from './unseen-poke-card/unseen-poke-card.component';

@NgModule({
  declarations: [
    PokeCardComponent,
    SeenPokeCardComponent,
    UnseenPokeCardComponent,
  ],
  exports: [PokeCardComponent, UnseenPokeCardComponent, SeenPokeCardComponent],
  imports: [CommonModule, LazyImgDirectiveModule],
})
export class PokeCardModule {}
