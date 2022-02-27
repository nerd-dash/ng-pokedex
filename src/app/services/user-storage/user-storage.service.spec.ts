import { TestBed } from '@angular/core/testing';
import { AccessToken } from 'src/app/models/AccessToken';
import { User } from 'src/app/models/User';
import { UserStorageService } from './user-storage.service';

describe('UserStorageService', () => {
  let service: UserStorageService;
  let localstorageSpy: {
    getItem: jasmine.Spy<(key: string) => string> | undefined;
    setItem: jasmine.Spy<(key: string, value: string) => void> | undefined;
    removeItem: jasmine.Spy<() => void> | undefined;
  } = {
    getItem: undefined,
    setItem: undefined,
    removeItem: undefined,
  };

  const user: User = {
    id: 1,
    email: 'email',
    password: 'password',
  };

  const accessToken: AccessToken<User> = {
    accessToken: 'accessToken',
    payload: user,
  };

  beforeEach(() => {
    localstorageSpy.getItem = spyOn(localStorage, 'getItem');
    localstorageSpy.setItem = spyOn(localStorage, 'setItem');
    localstorageSpy.removeItem = spyOn(localStorage, 'removeItem');

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStorageService);
  });

  afterEach(() => {
    localstorageSpy = {
      getItem: undefined,
      setItem: undefined,
      removeItem: undefined,
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setItem', () => {
    it('should convert a user to Json and pass it to localstorage on the designited key', () => {
      service.setItem(accessToken);
      expect(localstorageSpy.setItem).toHaveBeenCalledOnceWith(
        service.STORAGE_TOKEN,
        JSON.stringify(accessToken)
      );
    });
  });

  describe('getItem', () => {
    it('shold get back the object determined by the key', () => {
      localstorageSpy.getItem?.and.returnValue(JSON.stringify(accessToken));
      const item = service.getItem();
      expect(localstorageSpy.getItem).toHaveBeenCalledOnceWith(
        service.STORAGE_TOKEN
      );
      expect(item).toEqual(accessToken);
    });
  });

  describe('clear', () => {
    it('shold clear all data on the localstorage for the type keys', () => {
      service.clear();
      expect(localstorageSpy.removeItem).toHaveBeenCalledOnceWith(
        service.STORAGE_TOKEN
      );
    });
  });
});
