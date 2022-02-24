import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeCardModule } from '../pokedex/component/poke-card.module';
import { PokemonGameStateService } from '../services/pokemon-game-state/pokemon-game-state.service';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { POKEMON_GAME_STATE_SERVICE } from '../tokens/game-state/pokemon-game-state-service.token';
import { USER_AUTH_SERVICE } from '../tokens/user-auth-service.token';
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
      provide: USER_AUTH_SERVICE,
      useExisting: UserAuthService,
    },
    {
      provide: POKEMON_GAME_STATE_SERVICE,
      useExisting: PokemonGameStateService,
    },
  ],
})
export class PokegameModule {}
