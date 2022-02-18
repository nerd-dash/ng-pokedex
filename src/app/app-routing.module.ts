import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/container/pokedex/pokedex.component';
import { PokegameComponent } from './pokegame/container/pokegame/pokegame.component';

const routes: Routes = [
  {
    path: 'pokedex',
    loadChildren: () =>
      import('./pokedex/pokedex.module').then((module) => module.PokedexModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./pokegame/pokegame.module').then(
        (module) => module.PokegameModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
