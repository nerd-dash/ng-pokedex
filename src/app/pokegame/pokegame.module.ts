import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeCardModule } from '../pokedex/component/poke-card.module';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PokegameComponent } from './container/pokegame/pokegame.component';
import { RandomPokemonComponent } from './container/random-pokemon/random-pokemon.component';
import { WhosThatPokemonComponent } from './container/whos-that-pokemon/whos-that-pokemon.component';
import { PokegameRoutingModule } from './pokegame-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PokeCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    PokegameRoutingModule,
  ],
  declarations: [
    PokegameComponent,
    WhosThatPokemonComponent,
    RandomPokemonComponent,
    NavbarComponent,
  ],
})
export class PokegameModule {}
