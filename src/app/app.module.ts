import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokegameRouteGuard } from './guards/pokegame.route-guard';
import { PokeserverAccessTokenInterceptor } from './services/http-interceptor/pokeserver-access-token/pokeserver-access-token.interceptor';
import { PokeserverLoginRequestInterceptor } from './services/http-interceptor/pokeserver-login-request/pokeserver-login-request.interceptor';
import { PokemonFetchService } from './services/pokemon-fetch/pokemon-fetch.service';
import { PokemonGameStateService } from './services/pokemon-game-state/pokemon-game-state.service';
import { SightingFetchService } from './services/sighting-fetch/sighting-fetch.service';
import { SightingGameStateService } from './services/sighting-game-state/sighting-game-state.service';
import { UserAuthService } from './services/user-auth/user-auth.service';
import { UserStateService } from './services/user-state/user-state.service';
import { UserStorageService } from './services/user-storage/user-storage.service';
import { UtilsService } from './services/utils/utils.service';
import { AUTH_FETCH_SERVICE } from './tokens/fetch/auth-fetch-service.token';
import { POKEMON_FETCH_SERVICE } from './tokens/fetch/pokemon-fetch-service.token';
import { SIGHTING_FETCH_SERVICE } from './tokens/fetch/sighting-fetch-service.token';
import { POKEMON_GAME_STATE_SERVICE } from './tokens/game-state/pokemon-game-state-service.token';
import { SIGHTING_GAME_STATE_SERVICE } from './tokens/game-state/sighting-game-state-service.token';
import { USER_STATE_SERVICE } from './tokens/game-state/user-state-service.token';
import { POKEMON_CAN_ACTIVATE } from './tokens/pokegame-can-activate.token';
import { USER_STORAGE_SERVICE } from './tokens/user-storage-service.token';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [
    UtilsService,

    { provide: USER_STORAGE_SERVICE, useExisting: UserStorageService },
    { provide: USER_STATE_SERVICE, useExisting: UserStateService },
    { provide: AUTH_FETCH_SERVICE, useExisting: UserAuthService },

    { provide: POKEMON_FETCH_SERVICE, useExisting: PokemonFetchService },
    { provide: SIGHTING_FETCH_SERVICE, useExisting: SightingFetchService },
    {
      provide: SIGHTING_GAME_STATE_SERVICE,
      useExisting: SightingGameStateService,
    },
    {
      provide: POKEMON_GAME_STATE_SERVICE,
      useExisting: PokemonGameStateService,
    },

    {
      provide: POKEMON_CAN_ACTIVATE,
      useExisting: PokegameRouteGuard,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: PokeserverLoginRequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: PokeserverAccessTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
