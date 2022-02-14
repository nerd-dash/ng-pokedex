import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PokeCardModule } from '../pokedex/component/poke-card.module';
import { PokemonGameStateService } from '../services/pokemon-game-state.service';
import { GAME_STATE_SERVICE } from '../tokens/game-state.service.token';
import { PokegameComponent } from './container/pokegame/pokegame.component';
import { WhosThatPokemonComponent } from './container/whos-that-pokemon/whos-that-pokemon.component';

@NgModule({
  declarations: [PokegameComponent, WhosThatPokemonComponent],
  providers: [
    { provide: GAME_STATE_SERVICE, useClass: PokemonGameStateService },
  ],
  imports: [CommonModule, PokeCardModule, ReactiveFormsModule],
  exports: [PokegameComponent, WhosThatPokemonComponent]
})
export class PokegameModule { }
