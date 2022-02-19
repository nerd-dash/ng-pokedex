import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { AccessToken } from '../models/AccessToken';
import { User } from '../models/User';
import { PokeAuthService } from './poke-auth.service';

describe('PokeAuthService', () => {
  let service: PokeAuthService;
  let httpTestingController: HttpTestingController;

  const accessToken: AccessToken<User> = {
    accessToken: 'accessToken',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeAuthService],
    });
    service = TestBed.inject(PokeAuthService);
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
        });

      const req = httpTestingController.expectOne(
        `${environment.SERVER_BASE_URL}/login`
      );

      expect(req.request.method).toEqual('POST');

      req.flush(accessToken);
    });
  });
});
