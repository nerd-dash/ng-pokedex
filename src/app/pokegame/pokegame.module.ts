import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PokedexModule } from '../pokedex/pokedex.module';
import { PokegameComponent } from './container/pokegame/pokegame.component';
import { WhosThatPokemonComponent } from './container/whos-that-pokemon/whos-that-pokemon.component';

@NgModule({
  declarations: [PokegameComponent, WhosThatPokemonComponent],
  imports: [CommonModule, PokedexModule],
})
export class PokegameModule {}
