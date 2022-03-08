import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthStateService } from 'src/app/models/AuthStateService';
import { User } from 'src/app/models/User';
import { USER_STATE_SERVICE } from 'src/app/tokens/game-state/user-state-service.token';
import { sightings } from 'src/app/utils/testing/sightings';
import { environment } from 'src/environments/environment';
import { Sighting } from '../../models/Sighting';
import { SightingFetchService } from './sighting-fetch.service';

const sighting: Sighting = {
  id: 1,
  pokemonId: 1,
  userId: 2,
};

const accessToken: AccessToken<User> = {
  accessToken: '',
  payload: {
    id: 1,
    email: '',
  },
};

describe('SightingFetchService', () => {
  let service: SightingFetchService;
  let httpTestingController: HttpTestingController;
  let authStateServiceSpy: jasmine.SpyObj<AuthStateService<User>>;

  beforeEach(() => {
    authStateServiceSpy = jasmine.createSpyObj<AuthStateService<User>>({
      loggedIn$: of(accessToken),
    });

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SightingFetchService,
        { provide: USER_STATE_SERVICE, useValue: authStateServiceSpy },
      ],
    });
    service = TestBed.inject(SightingFetchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should make a GET request to sighting and return an observable with all sighting data from the logged user', () => {
      const userSightings = sightings.filter((sight) => sight.userId == 1);

      service.getAll$().subscribe((sightings) => {
        expect(sightings).toBe(userSightings);
      });

      const req = httpTestingController.expectOne(
        `${environment.SIGHTING_SERVER_BASE_URL}?userId=1`
      );

      expect(req.request.method).toEqual('GET');

      req.flush(userSightings);
    });
  });

  describe('get$', () => {
    it('should make a GET request to sighting and return an observable with requested sighting data', () => {
      const id = 1;
      service.get$(id).subscribe((sighting) => {
        expect(sighting).toBe(sighting);
      });

      const req = httpTestingController.expectOne(
        `${environment.SIGHTING_SERVER_BASE_URL}/${id}`
      );

      expect(req.request.method).toEqual('GET');

      req.flush(sighting);
    });
  });

  describe('post$', () => {
    it('should make a POST request to sighting api update', () => {
      const sight: Sighting = { ...sighting, pokemonId: 134 };
      service.post$(sight).subscribe((sighting) => {
        expect(sighting).toBe(sight);
      });

      const req = httpTestingController.expectOne(
        `${environment.SIGHTING_SERVER_BASE_URL}`
      );

      expect(req.request.method).toEqual('POST');

      req.flush(sight);
    });
  });

  describe('put$', () => {
    it('should throw an error', () => {
      try {
        service.put$(sighting);
        fail();
      } catch (error) {
        expect(error).toBe('Method not allowed!');
      }
    });
  });

  describe('patch$', () => {
    it('should throw an error', () => {
      try {
        service.patch$(sighting);
        fail();
      } catch (error) {
        expect(error).toBe('Method not allowed!');
      }
    });
  });

  describe('delete$', () => {
    it('should throw an error', () => {
      try {
        service.delete$(sighting);
        fail();
      } catch (error) {
        expect(error).toBe('Method not allowed!');
      }
    });
  });
});
