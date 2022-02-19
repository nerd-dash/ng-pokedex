import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokegameComponent } from './container/pokegame/pokegame.component';
import { RandomPokemonComponent } from './container/random-pokemon/random-pokemon.component';

const routes: Routes = [
  {
    path: '',
    component: PokegameComponent,
    children: [
      { path: '', component: RandomPokemonComponent },
      {
        path: 'pokedex',
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
