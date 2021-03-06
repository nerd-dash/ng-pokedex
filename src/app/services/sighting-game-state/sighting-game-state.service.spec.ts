import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ServiceStateSpy } from 'src/app/utils/testing/ServiceStateSpy';
import { FetchService } from '../../models/FetchService';
import { EMPTY_SIGHTING, Sighting } from '../../models/Sighting';
import { SIGHTING_FETCH_SERVICE } from '../../tokens/fetch/sighting-fetch-service.token';
import { sightings } from '../../utils/testing/sightings';
import { UtilsService } from '../utils/utils.service';
import { SightingGameStateService } from './sighting-game-state.service';

describe('SightingGameStateService', () => {
  let service: SightingGameStateService;
  let fetchServiceSpy: jasmine.SpyObj<FetchService<Sighting>>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;
  let stateServiceSpy: ServiceStateSpy;

  beforeEach(() => {
    fetchServiceSpy = jasmine.createSpyObj<FetchService<Sighting>>({
      getAll$: of(sightings),
      get$: of(EMPTY_SIGHTING),
      post$: of(EMPTY_SIGHTING),
    });

    utilsServiceSpy = jasmine.createSpyObj<UtilsService>({
      getRandomItem: sightings[0],
      getRandomNumber: 0,
      hasTheSameName: true,
    });

    TestBed.configureTestingModule({
      providers: [
        {
          provide: SIGHTING_FETCH_SERVICE,
          useValue: fetchServiceSpy,
        },
        { provide: UtilsService, useValue: utilsServiceSpy },
      ],
    });
    service = TestBed.inject(SightingGameStateService);
    stateServiceSpy = new ServiceStateSpy(service);
    service.initiateState$().subscribe().unsubscribe();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initiateState$', () => {
    it('should call the getAll method from fetch servce', () => {
      expect(stateServiceSpy.setState).toHaveBeenCalledTimes(1);
      expect(fetchServiceSpy.getAll$).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllItems$', () => {
    it('should update get all the sightings from the state', () => {
      service
        .getAllItems$()
        .subscribe((sighs) => {
          expect(sighs).toEqual(sightings);
          expect(stateServiceSpy.select).toHaveBeenCalledTimes(1);
        })
        .unsubscribe();
    });
  });

  describe('verify', () => {
    it('should throw an error', () => {
      try {
        service.verifyItems(sightings[0]);
        fail();
      } catch (error) {
        expect(error).toBe('Method not allowed!');
      }
    });
  });

  describe('getNextItem', () => {
    it('should throw an error', () => {
      try {
        service.getNextItem();
        fail();
      } catch (error) {
        expect(error).toBe('Method not allowed!');
      }
    });
  });

  describe('updateItem$', () => {
    it('should call the service to post the item', () => {
      const expected: Sighting = { id: 0, pokemonId: 1, userId: 2 };
      service.updateItem$(expected).subscribe((sighting) => {
        expect(fetchServiceSpy.post$).toHaveBeenCalledOnceWith(expected);
        expect(sighting).toBe(EMPTY_SIGHTING);
      });
    });
  });

  describe('getItem$', () => {
    it('should throw an error', () => {
      try {
        service.getItem$();
        fail();
      } catch (error) {
        expect(error).toBe('Method not allowed!');
      }
    });
  });
});
