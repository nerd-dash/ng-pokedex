import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AccessToken } from '../models/AccessToken';
import { AuthStateService } from '../models/AuthStateService';
import { APP_ROUTES, AUTH_ROUTES } from '../models/RoutesMap';
import { EMPTY_USER, User } from '../models/User';
import { USER_STATE_SERVICE } from '../tokens/game-state/user-state-service.token';
import { PokegameRouteGuard } from './pokegame.route-guard';

describe('PokegameRouteGuard', () => {
  let guard: PokegameRouteGuard;
  let routerSpy: jasmine.SpyObj<Router>;
  let stateServiceSpy: jasmine.SpyObj<AuthStateService<User>>;

  const LOGIN_FULL_ROUTE = [`/${APP_ROUTES.Auth}/${AUTH_ROUTES.Login}`];

  const accessToken: AccessToken<User> = {
    accessToken: 'fakeAceessToken',
    payload: EMPTY_USER,
  };

  beforeEach(async () => {
    stateServiceSpy = jasmine.createSpyObj<AuthStateService<User>>({
      loggedIn$: of(accessToken),
    });

    routerSpy = jasmine.createSpyObj<Router>({
      navigate: undefined,
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        PokegameRouteGuard,
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
    guard = TestBed.inject(PokegameRouteGuard);
  });

  it('should create', () => {
    expect(guard).toBeTruthy();
  });

  describe('canActivate', () => {
    beforeEach(() => {
      routerSpy.navigate.calls.reset();
    });

    it('should redirect to login page if no accesToken detected', () => {
      stateServiceSpy.loggedIn$.and.returnValue(of(<AccessToken>{}));
      guard
        .canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{})
        .subscribe((token) => {
          expect(token).toBeFalse();
          expect(routerSpy.navigate).toHaveBeenCalledOnceWith(LOGIN_FULL_ROUTE);
        }).unsubscribe;
    });

    it('should return true if accesToken detected', () => {
      guard
        .canActivate(<ActivatedRouteSnapshot>{}, <RouterStateSnapshot>{})
        .subscribe((token) => {
          expect(token).toBeTrue();
          expect(routerSpy.navigate).not.toHaveBeenCalledOnceWith(
            LOGIN_FULL_ROUTE
          );
        }).unsubscribe;
    });
  });
});
