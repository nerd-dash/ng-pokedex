import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AUTH_ROUTES } from '../models/RoutesMap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: AUTH_ROUTES.Login,
  },
  {
    path: AUTH_ROUTES.Register,
    component: RegisterComponent,
  },
  {
    path: AUTH_ROUTES.Login,
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
