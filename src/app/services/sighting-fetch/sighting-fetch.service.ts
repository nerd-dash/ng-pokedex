import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { mergeMap } from 'rxjs';
import { AuthStateService } from 'src/app/models/AuthStateService';
import { FetchService } from 'src/app/models/FetchService';
import { Sighting } from 'src/app/models/Sighting';
import { User } from 'src/app/models/User';
import { USER_STATE_SERVICE } from 'src/app/tokens/game-state/user-state-service.token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SightingFetchService implements FetchService<Sighting> {
  constructor(
    @Inject(USER_STATE_SERVICE) private stateService: AuthStateService<User>,
    private httpClient: HttpClient
  ) {}
  getAll$ = () =>
    this.stateService.loggedIn$().pipe(
      mergeMap((token) => {
        const params = new HttpParams().set('userId', `${token.payload.id}`);
        return this.httpClient.get<Sighting[]>(
          `${environment.SIGHTING_SERVER_BASE_URL}`,
          {
            params,
          }
        );
      })
    );
  get$ = (id: number) =>
    this.httpClient.get<Sighting>(
      `${environment.SIGHTING_SERVER_BASE_URL}/${id}`
    );
  post$ = (entity: Sighting) =>
    this.stateService.loggedIn$().pipe(
      mergeMap((token) =>
        this.httpClient.post<Sighting>(
          `${environment.SIGHTING_SERVER_BASE_URL}`,
          {
            ...entity,
            userId: token.payload.id,
          }
        )
      )
    );

  put$ = (entity: Sighting) => {
    throw 'Method not allowed!';
  };
  patch$ = (entity: Sighting) => {
    throw 'Method not allowed!';
  };
  delete$ = (entity: Sighting) => {
    throw 'Method not allowed!';
  };
}
