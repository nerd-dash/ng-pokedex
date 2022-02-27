import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonFetchService } from './services/pokemon-fetch/pokemon-fetch.service';
import { PublishableUserService } from './services/publishable-user/publishable-user.service';
import { SightingFetchService } from './services/sighting-fetch/sighting-fetch.service';
import { SightingGameStateService } from './services/sighting-game-state/sighting-game-state.service';
import { UserStorageService } from './services/user-storage/user-storage.service';
import { POKEMON_FETCH_SERVICE } from './tokens/fetch/pokemon-fetch-service.token';
import { SIGHTING_FETCH_SERVICE } from './tokens/fetch/sighting-fetch-service.token';
import { SIGHTING_GAME_STATE_SERVICE } from './tokens/game-state/sighting-game-state-service.token';
import { PUBLISHABLE_SERVICE } from './tokens/publishable-service.token';
import { STORAGE_SERVICE } from './tokens/user-storage-service.token';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: PUBLISHABLE_SERVICE,
      useExisting: PublishableUserService,
    },
    {
      provide: POKEMON_FETCH_SERVICE,
      useExisting: PokemonFetchService,
    },
    {
      provide: SIGHTING_FETCH_SERVICE,
      useExisting: SightingFetchService,
    },
    {
      provide: SIGHTING_GAME_STATE_SERVICE,
      useExisting: SightingGameStateService,
    },
    {
      provide: STORAGE_SERVICE,
      useExisting: UserStorageService,
    },
  ],
})
export class AppModule {}
