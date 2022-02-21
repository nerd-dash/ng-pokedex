import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokeFetchService } from './services/poke-fetch.service';
import { PokemonGameStateService } from './services/pokemon-game-state.service';
import { PublishableUserService } from './services/publishable-user.service';
import { FETCH_SERVICE } from './tokens/fetch.service.token';
import { GAME_STATE_SERVICE } from './tokens/game-state.service.token';
import { PUBLISHABLE_SERVICE } from './tokens/publishable-service-token';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: GAME_STATE_SERVICE,
      useExisting: PokemonGameStateService,
    },
    {
      provide: PUBLISHABLE_SERVICE,
      useExisting: PublishableUserService,
    },
    {
      provide: FETCH_SERVICE,
      useExisting: PokeFetchService,
    },
  ],
})
export class AppModule {}
