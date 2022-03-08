import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { POKEGAME_ROUTES } from '../models/RoutesMap';
import { POKEMON_CAN_ACTIVATE } from '../tokens/pokegame-can-activate.token';
import { PokegameComponent } from './container/pokegame/pokegame.component';
import { RandomPokemonComponent } from './container/random-pokemon/random-pokemon.component';

const routes: Routes = [
  {
    path: '',
    component: PokegameComponent,
    canActivate: [POKEMON_CAN_ACTIVATE],
    children: [
      { path: '', redirectTo: POKEGAME_ROUTES.Pokegame },
      { path: POKEGAME_ROUTES.Pokegame, component: RandomPokemonComponent },
      {
        path: POKEGAME_ROUTES.Pokedex,
        loadChildren: () =>
          import('../pokedex/pokedex.module').then(
            (module) => module.PokedexModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokegameRoutingModule {}
