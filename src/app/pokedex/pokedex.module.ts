import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PokeCardComponent } from 'src/app/pokedex/component/poke-card/poke-card.component';
import { FETCH_SERVICE } from '../tokens/fetch.service.token';
import { PokeFetchService } from '../services/poke-fetch.service';
import { SeenPokeCardComponent } from './component/seen-poke-card/seen-poke-card.component';
import { UnseenPokeCardComponent } from './component/unseen-poke-card/unseen-poke-card.component';
import { PokeListComponent } from './container/poke-list/poke-list.component';
import { PokedexComponent } from './container/pokedex/pokedex.component';

@NgModule({
  declarations: [
    PokedexComponent,
    PokeListComponent,
    PokeCardComponent,
    SeenPokeCardComponent,
    UnseenPokeCardComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  exports: [
    PokedexComponent,
    PokeListComponent,
    PokeCardComponent,
    UnseenPokeCardComponent,
    SeenPokeCardComponent,
  ],
  providers: [{ provide: FETCH_SERVICE, useClass: PokeFetchService }],
})
export class PokedexModule {}
