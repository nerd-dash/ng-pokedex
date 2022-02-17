import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PokemonGameStateService } from '../services/pokemon-game-state.service';
import { GAME_STATE_SERVICE } from '../tokens/game-state.service.token';
import { PokeCardModule } from './component/poke-card.module';
import { PokedexComponent } from './container/pokedex/pokedex.component';

@NgModule({
  declarations: [PokedexComponent],
  imports: [BrowserModule, HttpClientModule, PokeCardModule],
  exports: [PokedexComponent],
  providers: [
    { provide: GAME_STATE_SERVICE, useExisting: PokemonGameStateService },
  ],
})
export class PokedexModule {}
