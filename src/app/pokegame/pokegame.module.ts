import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeCardModule } from '../pokedex/component/poke-card.module';
import { PokeFetchService } from '../services/poke-fetch.service';
import { PokemonGameStateService } from '../services/pokemon-game-state.service';
import { FETCH_SERVICE } from '../tokens/fetch.service.token';
import { GAME_STATE_SERVICE } from '../tokens/game-state.service.token';
import { PokegameComponent } from './container/pokegame/pokegame.component';
import { WhosThatPokemonComponent } from './container/whos-that-pokemon/whos-that-pokemon.component';

@NgModule({
  declarations: [PokegameComponent, WhosThatPokemonComponent],
  providers: [
    {
      provide: GAME_STATE_SERVICE,
      useExisting: PokemonGameStateService,
    },
    {
      provide: FETCH_SERVICE,
      useExisting: PokeFetchService,
    },
  ],
  imports: [CommonModule, PokeCardModule, ReactiveFormsModule],
})
export class PokegameModule {}
