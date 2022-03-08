import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthStateService } from 'src/app/models/AuthStateService';
import { USER_STATE_SERVICE } from 'src/app/tokens/game-state/user-state-service.token';
import { AccessToken } from '../../models/AccessToken';
import { User } from '../../models/User';
import { USER_AUTH_ENDPOINTS } from './user-auth.endpoints';
import { UserAuthService } from './user-auth.service';

describe('UserAuthService', () => {
  let service: UserAuthService;
  let httpTestingController: HttpTestingController;
  let authStateServiceSpy: jasmine.SpyObj<AuthStateService<User>>;

  const user: User = {
    id: 1,
    email: 'email',
    password: 'password',
  };

  const accessToken: AccessToken<User> = {
    accessToken: 'accessToken',
    payload: user,
  };

  beforeEach(async () => {
    authStateServiceSpy = jasmine.createSpyObj<AuthStateService<User>>({
      updateToken: undefined,
    });

    TestBed.configureTestingModule({
      providers: [
        UserAuthService,
        { provide: USER_STATE_SERVICE, useValue: authStateServiceSpy },
      ],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserAuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register$', () => {
    it('should make a POST request to /register and should get an access token', () => {
      service
        .register$({ email: 'email', password: 'password' })
        .subscribe((_accessToken) => {
          expect(_accessToken).toBe(accessToken);
        });

      const req = httpTestingController.expectOne(USER_AUTH_ENDPOINTS.Register);

      expect(req.request.method).toEqual('POST');

      req.flush(accessToken);
    });
  });

  describe('login$', () => {
    it('should make a POST request to /login and should get an access token', () => {
      service
        .login$({ email: 'email', password: 'password' })
        .subscribe((_accessToken) => {
          expect(_accessToken).toBe(accessToken);
          expect(_accessToken.payload).not.toBeUndefined();
        });

      const req = httpTestingController.expectOne(USER_AUTH_ENDPOINTS.Login);

      expect(req.request.method).toEqual('POST');

      req.flush(accessToken);
    });

    it('should get the login info and send it to the state service', () => {
      service
        .login$({ email: 'email', password: 'password' })
        .subscribe((_accessToken) => {
          expect(authStateServiceSpy.updateToken).toHaveBeenCalledOnceWith(
            _accessToken
          );
        });

      const req = httpTestingController.expectOne(USER_AUTH_ENDPOINTS.Login);

      expect(req.request.method).toEqual('POST');

      req.flush(accessToken);
    });
  });
});
