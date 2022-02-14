import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PokeFetchService } from '../services/poke-fetch.service';
import { FETCH_SERVICE } from '../tokens/fetch.service.token';
import { PokeCardModule } from './component/poke-card.module';
import { PokeListComponent } from './container/poke-list/poke-list.component';
import { PokedexComponent } from './container/pokedex/pokedex.component';

@NgModule({
  declarations: [
    PokedexComponent,
    PokeListComponent,

  ],
  imports: [BrowserModule, HttpClientModule, PokeCardModule],
  exports: [
    PokedexComponent,
    PokeListComponent,

  ],
  providers: [{ provide: FETCH_SERVICE, useClass: PokeFetchService }],
})
export class PokedexModule { }
