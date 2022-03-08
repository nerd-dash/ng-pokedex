import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, tap } from 'rxjs';
import { AccessToken } from '../models/AccessToken';
import { AuthStateService } from '../models/AuthStateService';
import { APP_ROUTES, AUTH_ROUTES } from '../models/RoutesMap';
import { User } from '../models/User';
import { USER_STATE_SERVICE } from '../tokens/game-state/user-state-service.token';

@Injectable({
  providedIn: 'root',
})
export class PokegameRouteGuard implements CanActivate {
  private LOGIN_FULL_ROUTE = [`/${APP_ROUTES.Auth}/${AUTH_ROUTES.Login}`];

  constructor(
    @Inject(USER_STATE_SERVICE) private stateService: AuthStateService<User>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.stateService
      .loggedIn$()
      .pipe(map(this.hasValidAccessToken), tap(this.noTokenRedirect));
  }

  private hasValidAccessToken = (token: AccessToken) => !!token.accessToken;
  private noTokenRedirect = (hasToken: boolean) =>
    !hasToken && this.router.navigate(this.LOGIN_FULL_ROUTE);
}
