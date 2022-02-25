import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PokemonGameStateService } from '../services/pokemon-game-state/pokemon-game-state.service';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { POKEMON_GAME_STATE_SERVICE } from '../tokens/game-state/pokemon-game-state-service.token';
import { USER_AUTH_SERVICE } from '../tokens/user-auth-service.token';
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
      provide: USER_AUTH_SERVICE,
      useExisting: UserAuthService,
    },
    {
      provide: POKEMON_GAME_STATE_SERVICE,
      useExisting: PokemonGameStateService,
    },
  ],
})
export class PokedexModule {}
