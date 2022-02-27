import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StorageService } from 'src/app/models/StorageService';
import { STORAGE_SERVICE } from 'src/app/tokens/user-storage-service.token';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../../models/AccessToken';
import { PublishableService } from '../../models/PublishableService';
import { User } from '../../models/User';
import { PUBLISHABLE_SERVICE } from '../../tokens/publishable-service.token';
import { UserAuthService } from './user-auth.service';

describe('UserAuthService', () => {
  let service: UserAuthService;
  let httpTestingController: HttpTestingController;
  let publishiableServiceSpy: jasmine.SpyObj<PublishableService<User>>;
  let storageServiceSpy: jasmine.SpyObj<StorageService<AccessToken<User>>>;

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
    publishiableServiceSpy = jasmine.createSpyObj<PublishableService<User>>({
      asObservable$: of(user),
      next: undefined,
    });

    storageServiceSpy = jasmine.createSpyObj<StorageService<AccessToken<User>>>(
      {
        setItem: undefined,
      }
    );

    TestBed.configureTestingModule({
      providers: [
        UserAuthService,
        { provide: PUBLISHABLE_SERVICE, useValue: publishiableServiceSpy },
        { provide: STORAGE_SERVICE, useValue: storageServiceSpy },
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

      const req = httpTestingController.expectOne(
        `${environment.SERVER_BASE_URL}/register`
      );

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
          expect(publishiableServiceSpy.next).toHaveBeenCalledOnceWith(
            _accessToken.payload
          );
        });

      const req = httpTestingController.expectOne(
        `${environment.SERVER_BASE_URL}/login`
      );

      expect(req.request.method).toEqual('POST');

      req.flush(accessToken);
    });

    it('should create an iten on local storage called token with the accessToken', () => {
      service
        .login$({ email: 'email', password: 'password' })
        .subscribe((_accessToken) => {
          expect(storageServiceSpy.setItem).toHaveBeenCalledOnceWith(
            _accessToken
          );
        });

      const req = httpTestingController.expectOne(
        `${environment.SERVER_BASE_URL}/login`
      );

      expect(req.request.method).toEqual('POST');

      req.flush(accessToken);
    });
  });

  describe('loggedInd$', () => {
    it('should return data from the current logged in user', () => {
      service.loggedIn$().subscribe(() => {
        expect(publishiableServiceSpy.asObservable$).toHaveBeenCalledTimes(1);
      });
    });
  });
});
