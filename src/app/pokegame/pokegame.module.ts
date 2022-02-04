import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PokedexModule } from '../pokedex/pokedex.module';
import { FETCH_SERVICE } from '../services/fetch.service.token';
import { PokeFetchService } from '../services/poke-fetch.service';
import { PokemonVerificationService } from '../services/pokemon-verification.service';
import { UtilsService } from '../services/utils.service';
import { VERIFICATION_SERVICE } from '../services/verification.service.token';
import { PokegameComponent } from './container/pokegame/pokegame.component';
import { WhosThatPokemonComponent } from './container/whos-that-pokemon/whos-that-pokemon.component';

@NgModule({
  declarations: [PokegameComponent, WhosThatPokemonComponent],
  providers: [
    { provide: VERIFICATION_SERVICE, useClass: PokemonVerificationService },
  ],
  imports: [CommonModule, PokedexModule, ReactiveFormsModule],
  exports: [PokegameComponent, WhosThatPokemonComponent]
})
export class PokegameModule { }
