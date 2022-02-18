import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokegameComponent } from './container/pokegame/pokegame.component';

const routes: Routes = [
  {
    path: '',
    component: PokegameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokegameRoutingModule {}
