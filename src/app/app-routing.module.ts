import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokedexComponent } from './pokedex/container/pokedex/pokedex.component';
import { PokegameComponent } from './pokegame/container/pokegame/pokegame.component';

const routes: Routes = [
  { path: 'pokedex', component: PokedexComponent },
  { path: '', component: PokegameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
