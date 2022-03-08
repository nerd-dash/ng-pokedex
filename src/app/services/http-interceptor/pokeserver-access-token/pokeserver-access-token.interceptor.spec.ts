import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LoginComponent } from 'src/app/authentication/login/login.component';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthStateService } from 'src/app/models/AuthStateService';
import Pokemon from 'src/app/models/Pokemon';
import { APP_ROUTES, AUTH_ROUTES } from 'src/app/models/RoutesMap';
import { EMPTY_USER, User } from 'src/app/models/User';
import { PokegameComponent } from 'src/app/pokegame/container/pokegame/pokegame.component';
import { USER_STATE_SERVICE } from 'src/app/tokens/game-state/user-state-service.token';
import { pokes } from 'src/app/utils/testing/pokes';
import { PokeserverAccessTokenInterceptor } from './pokeserver-access-token.interceptor';

@Injectable()
class FakeFetchService {
  constructor(private httpClient: HttpClient) {}

  pokemonById$ = (id: number) => this.httpClient.get<Pokemon>(`/pokemon/${id}`);
}

describe(`PokeserverAccessTokenInterceptor`, () => {
  let interceptor: PokeserverAccessTokenInterceptor;
  let httpTestingController: HttpTestingController;
  let stateServiceSpy: jasmine.SpyObj<AuthStateService<User>>;
  let routerSpy: jasmine.SpyObj<Router>;
  let fakeService: FakeFetchService;

  const LOGIN_FULL_ROUTE = [`/${APP_ROUTES.Auth}/${AUTH_ROUTES.Login}`];

  const token: AccessToken<User> = {
    accessToken: 'fakeAceessToken',
    payload: EMPTY_USER,
  };

  beforeEach(async () => {
    stateServiceSpy = jasmine.createSpyObj<AuthStateService<User>>({
      loggedIn$: of(token),
    });

    routerSpy = jasmine.createSpyObj<Router>({
      navigate: undefined,
    });

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: '', component: PokegameComponent },
        ]),
        HttpClientTestingModule,
      ],
      providers: [
        FakeFetchService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: PokeserverAccessTokenInterceptor,
          multi: true,
        },

        {
          provide: USER_STATE_SERVICE,
          useValue: stateServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });

    interceptor = TestBed.inject(PokeserverAccessTokenInterceptor);
    httpTestingController = TestBed.inject(HttpTestingController);
    fakeService = TestBed.inject(FakeFetchService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    describe('with an access Token', () => {
      it('should proceed the request doing nothing', () => {
        fakeService.pokemonById$(1).subscribe();

        const req = httpTestingController.expectOne('/pokemon/1');

        expect(req.request.method).toEqual('GET');
        expect(req.request.headers.has('Authorization')).toEqual(true);
        expect(req.request.headers.get('Authorization')).toEqual(
          `Bearer ${token.accessToken}`
        );

        req.flush(pokes[0]);
      });
    });

    describe('without an access token', () => {
      beforeEach(() => {
        routerSpy.navigate.calls.reset();
      });

      it('should redirect to the login page if Unauthorized', (done) => {
        stateServiceSpy.loggedIn$.and.returnValue(of(<AccessToken>{}));

        fakeService.pokemonById$(1).subscribe({
          error: (_) => {
            expect(routerSpy.navigate).toHaveBeenCalledOnceWith(
              LOGIN_FULL_ROUTE
            );
            done();
          },
        });

        const req = httpTestingController.expectOne('/pokemon/1');

        expect(req.request.method).toEqual('GET');

        req.flush({}, { status: 401, statusText: 'Unauthorized' });
      });

      it('should redirect to the pokegame page if Forbidden', (done) => {
        stateServiceSpy.loggedIn$.and.returnValue(of(<AccessToken>{}));

        fakeService.pokemonById$(1).subscribe({
          error: (_) => {
            expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/']);
            done();
          },
        });

        const req = httpTestingController.expectOne('/pokemon/1');

        expect(req.request.method).toEqual('GET');

        req.flush({}, { status: 403, statusText: 'Forbidden' });
      });

      it('should redirect do nothing if another error', (done) => {
        stateServiceSpy.loggedIn$.and.returnValue(of(<AccessToken>{}));

        fakeService.pokemonById$(1).subscribe({
          error: (_) => {
            expect(routerSpy.navigate).not.toHaveBeenCalled();
            done();
          },
        });

        const req = httpTestingController.expectOne('/pokemon/1');

        expect(req.request.method).toEqual('GET');

        req.flush(
          {},
          { status: 451, statusText: 'Unavailable For Legal Reasons' }
        );
      });
    });
  });
});
