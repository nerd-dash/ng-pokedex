import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonFetchService } from './services/pokemon-fetch.service';
import { PokemonGameStateService } from './services/pokemon-game-state.service';
import { PublishableUserService } from './services/publishable-user.service';
import { UserAuthService } from './services/user-auth.service';
import { POKEMON_FETCH_SERVICE } from './tokens/fetch/pokemon-fetch-service.token';
import { POKEMON_GAME_STATE_SERVICE } from './tokens/game-state/pokemon-game-state-service.token';
import { SIGHTING_GAME_STATE_SERVICE } from './tokens/game-state/sighting-game-state-service.token';
import { PUBLISHABLE_SERVICE } from './tokens/publishable-service.token';
import { USER_AUTH_SERVICE } from './tokens/user-auth-service.token';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: SIGHTING_GAME_STATE_SERVICE,
      useExisting: PokemonGameStateService,
    },
    {
      provide: PUBLISHABLE_SERVICE,
      useExisting: PublishableUserService,
    },
    {
      provide: POKEMON_FETCH_SERVICE,
      useExisting: PokemonFetchService,
    },
    {
      provide: USER_AUTH_SERVICE,
      useExisting: UserAuthService,
    },
  ],
})
export class AppModule {}
