import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PokeCardModule } from './component/poke-card.module';
import { PokedexComponent } from './container/pokedex/pokedex.component';
import { PokedexRoutingModule } from './pokedex-routing.module';

@NgModule({
  declarations: [PokedexComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PokeCardModule,
    PokedexRoutingModule,
  ],
  exports: [PokedexComponent],
})
export class PokedexModule {}
