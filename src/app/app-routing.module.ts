import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './models/RoutesMap';

const routes: Routes = [
  {
    path: APP_ROUTES.Pokegame,
    loadChildren: () =>
      import('./pokegame/pokegame.module').then(
        (module) => module.PokegameModule
      ),
  },
  {
    path: APP_ROUTES.Auth,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (module) => module.AuthenticationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
