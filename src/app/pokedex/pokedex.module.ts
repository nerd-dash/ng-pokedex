import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PokeFetchService } from '../services/poke-fetch.service';
import { PokemonGameStateService } from '../services/pokemon-game-state.service';
import { FETCH_SERVICE } from '../tokens/fetch.service.token';
import { GAME_STATE_SERVICE } from '../tokens/game-state.service.token';
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
  providers: [
    { provide: GAME_STATE_SERVICE, useExisting: PokemonGameStateService },
    {
      provide: FETCH_SERVICE,
      useExisting: PokeFetchService,
    },
  ],
})
export class PokedexModule {}
