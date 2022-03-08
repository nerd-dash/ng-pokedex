import { TestBed } from '@angular/core/testing';
import { AccessToken } from 'src/app/models/AccessToken';
import { StorageService } from 'src/app/models/StorageService';
import { EMPTY_USER, User } from 'src/app/models/User';
import { USER_STORAGE_SERVICE } from 'src/app/tokens/user-storage-service.token';
import { ServiceStateSpy } from 'src/app/utils/testing/ServiceStateSpy';
import { UserStateService } from './user-state.service';

describe('UserStateService', () => {
  let service: UserStateService;
  let stateServiceSpy: ServiceStateSpy;
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

  const initialState: AccessToken<User> = {
    accessToken: '',
    payload: EMPTY_USER,
  };

  beforeEach(async () => {
    storageServiceSpy = jasmine.createSpyObj<StorageService<AccessToken<User>>>(
      {
        setItem: undefined,
        getItem: undefined,
      }
    );

    TestBed.configureTestingModule({
      providers: [
        {
          provide: USER_STORAGE_SERVICE,
          useValue: storageServiceSpy,
        },
      ],
    });
    service = TestBed.inject(UserStateService);
    stateServiceSpy = new ServiceStateSpy(service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`updateToken`, () => {
    it('should update the state with the passed token', () => {
      service.updateToken(accessToken);
      expect(stateServiceSpy.setState).toHaveBeenCalledTimes(1);
    });

    it(`should send the updated token to the storage service`, () => {
      service.updateToken(accessToken);
      expect(storageServiceSpy.setItem).toHaveBeenCalledOnceWith(accessToken);
    });
  });

  describe('loggedIn$', () => {
    it('should return the initial state', () => {
      service
        .loggedIn$()
        .subscribe((token) => {
          expect(token).toEqual(initialState);
        })
        .unsubscribe();
    });

    it('should return the initial value from the storage service', () => {
      storageServiceSpy.getItem.and.returnValue(accessToken);
      service = new UserStateService(storageServiceSpy);
      service
        .loggedIn$()
        .subscribe((token) => {
          expect(token).not.toEqual(initialState);
          expect(token).toEqual(accessToken);
        })
        .unsubscribe();
    });

    it('should return an update token from the state', () => {
      service.updateToken(accessToken);
      service
        .loggedIn$()
        .subscribe((loginData) => {
          expect(stateServiceSpy.select).toHaveBeenCalledTimes(1);
          expect(loginData).not.toBe(accessToken);
        })
        .unsubscribe();
    });
  });
});
