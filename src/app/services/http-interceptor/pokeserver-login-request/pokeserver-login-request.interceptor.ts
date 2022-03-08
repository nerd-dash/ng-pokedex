import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AccessToken } from 'src/app/models/AccessToken';
import { UserAuthEndpointList } from '../../user-auth/user-auth.endpoints';
import { LoginResponseBody } from '../pokeserver-access-token/pokeserver-access-token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class PokeserverLoginRequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.isTokenResponse(request)) {
      return this.tokenResponseHandler(next.handle(request));
    }
    return next.handle(request);
  }

  private isTokenResponse = (request: HttpRequest<any>): boolean =>
    UserAuthEndpointList.includes(request.url);

  private tokenResponseHandler = (
    response$: Observable<HttpEvent<any>>
  ): Observable<HttpEvent<any>> => {
    return response$.pipe(
      map((response) => {
        if (response instanceof HttpResponse) {
          const newResponse = response.clone({
            body: this.convertUserToPayload(response.body),
          });
          return newResponse;
        }

        return response;
      })
    );
  };

  private convertUserToPayload = (body: LoginResponseBody): AccessToken => {
    if (body.user) {
      body.payload = { ...body.user };
      delete body.user;
    }
    return body;
  };
}
