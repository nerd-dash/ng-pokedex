import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PokemonFetchService } from '../services/pokemon-fetch.service';
import { PokemonGameStateService } from '../services/pokemon-game-state.service';
import { POKEMON_FETCH_SERVICE } from '../tokens/fetch/pokemon-fetch-service.token';
import { POKEMON_GAME_STATE_SERVICE } from '../tokens/game-state/pokemon-game-state-service.token';
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
    {
      provide: POKEMON_GAME_STATE_SERVICE,
      useExisting: PokemonGameStateService,
    },
    {
      provide: POKEMON_FETCH_SERVICE,
      useExisting: PokemonFetchService,
    },
  ],
})
export class PokedexModule {}
