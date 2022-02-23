import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeCardModule } from '../pokedex/component/poke-card.module';
import { PokemonFetchService } from '../services/pokemon-fetch.service';
import { PokemonGameStateService } from '../services/pokemon-game-state.service';
import { POKEMON_FETCH_SERVICE } from '../tokens/fetch/pokemon-fetch-service.token';
import { POKEMON_GAME_STATE_SERVICE } from '../tokens/game-state/pokemon-game-state-service.token';
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
  providers: [
    {
      provide: POKEMON_FETCH_SERVICE,
      useExisting: PokemonFetchService,
    },
    {
      provide: POKEMON_GAME_STATE_SERVICE,
      useExisting: PokemonGameStateService,
    },
  ],
})
export class PokegameModule {}
