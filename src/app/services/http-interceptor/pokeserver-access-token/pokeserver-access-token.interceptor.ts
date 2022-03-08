import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthStateService } from 'src/app/models/AuthStateService';
import { APP_ROUTES, AUTH_ROUTES } from 'src/app/models/RoutesMap';
import { User } from 'src/app/models/User';
import { USER_STATE_SERVICE } from 'src/app/tokens/game-state/user-state-service.token';

export interface LoginResponseBody extends AccessToken {
  user?: User;
}

@Injectable({
  providedIn: 'root',
})
export class PokeserverAccessTokenInterceptor implements HttpInterceptor {
  private LOGIN_FULL_ROUTE = [`/${APP_ROUTES.Auth}/${AUTH_ROUTES.Login}`];

  constructor(
    @Inject(USER_STATE_SERVICE) private stateService: AuthStateService<User>,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.stateService.loggedIn$().pipe(
      (token$) => this.loggedInRequestHandler({ token$, request, next }),
      tap({
        error: this.onErrorResponse,
      })
    );
  }

  private loggedInRequestHandler = ({
    token$,
    request,
    next,
  }: {
    token$: Observable<AccessToken<User>>;
    request: HttpRequest<any>;
    next: HttpHandler;
  }) =>
    token$.pipe(
      map((token) => this.verifyTokenOnHeaders(token, request)),
      mergeMap((_request) => next.handle(_request))
    );

  private onErrorResponse = (error: HttpResponseBase) => {
    switch (error.status) {
      case 401:
        this.router.navigate(this.LOGIN_FULL_ROUTE);
        break;
      case 403:
        this.router.navigate(['/']);
        break;
      default:
        break;
    }
  };

  private verifyTokenOnHeaders = (
    token: AccessToken,
    request: HttpRequest<any>
  ) => {
    if (!!token.accessToken) {
      const authReq = this.addBearerTokenToAutorizationHeader(
        request,
        token.accessToken
      );
      return authReq;
    }
    return request;
  };

  private addBearerTokenToAutorizationHeader = (
    req: HttpRequest<any>,
    accessToken: string
  ): HttpRequest<any> =>
    req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
}
