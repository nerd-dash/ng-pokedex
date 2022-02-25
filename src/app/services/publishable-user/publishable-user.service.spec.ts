import { TestBed } from '@angular/core/testing';
import { User } from '../../models/User';
import { PublishableUserService } from './publishable-user.service';

const user: User = {
  id: 1,
  email: 'email',
  password: 'password',
};

describe('PublishableUserService', () => {
  let service: PublishableUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublishableUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('asObservable$ should return a observable that publishes when next() is called', () => {
    const expectedValue: User = {
      id: 99,
      email: 'email',
      password: 'password',
    };

    service
      .asObservable$()
      .subscribe((value) => {
        expect(value).toEqual(<User>{});
      })
      .unsubscribe();

    service.next(expectedValue);

    service
      .asObservable$()
      .subscribe((value) => {
        expect(value).toEqual(expectedValue);
      })
      .unsubscribe();
  });
});
