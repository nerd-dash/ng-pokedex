import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthFetchService } from 'src/app/models/AuthFetchService';
import { User } from 'src/app/models/User';
import { UserAuthEndpointList } from '../../user-auth/user-auth.endpoints';
import { LoginResponseBody } from '../pokeserver-access-token/pokeserver-access-token.interceptor';
import { PokeserverLoginRequestInterceptor } from './pokeserver-login-request.interceptor';

@Injectable()
class FakeFetchService implements Partial<AuthFetchService<User>> {
  constructor(private httpClient: HttpClient) {}

  login$ = (user: Partial<User>) =>
    this.httpClient.post<LoginResponseBody>(UserAuthEndpointList[0], {
      ...user,
    });
}

describe('PokeserverLoginRequestInterceptor', () => {
  let interceptor: PokeserverLoginRequestInterceptor;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  let fakeService: FakeFetchService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FakeFetchService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: PokeserverLoginRequestInterceptor,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(PokeserverLoginRequestInterceptor);
    httpTestingController = TestBed.inject(HttpTestingController);
    fakeService = TestBed.inject(FakeFetchService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  describe('intercept', () => {
    describe('on login requests', () => {
      afterEach(() => {
        httpTestingController.verify();
      });

      it('should pass the value of user to the payload prop of the response', () => {
        const loginResponse: LoginResponseBody = {
          accessToken: '',
          payload: undefined,
          user: {
            id: 1,
            email: 'user@email.com',
          },
        };

        fakeService
          .login$({ email: '', password: '', id: 0 })
          .subscribe((response) => {
            expect(response?.payload).not.toBeUndefined();
            expect(response?.payload?.id).toBe(1);
            expect(response?.user).toBeUndefined();
          });

        const req = httpTestingController.expectOne(UserAuthEndpointList[0]);

        expect(req.request.method).toEqual('POST');

        req.flush(loginResponse);
      });
    });

    describe('on other requests', () => {
      it('should just leave the request continue the flow', () => {
        httpClient.get<any>('someOtherEndpoint').subscribe((response) => {
          expect(response.payload).toBeUndefined();
          expect(response.user).not.toBeUndefined();
        });

        const req = httpTestingController.expectOne('someOtherEndpoint');

        expect(req.request.method).toEqual('GET');

        req.flush({ user: { name: 'name' } });
      });
    });
  });
});
