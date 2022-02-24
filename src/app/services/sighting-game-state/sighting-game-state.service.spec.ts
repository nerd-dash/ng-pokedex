import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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

  beforeEach(() => {
    fetchServiceSpy = jasmine.createSpyObj<FetchService<Sighting>>({
      getAll$: of(sightings),
      get$: of(EMPTY_SIGHTING),
      put$: of(EMPTY_SIGHTING),
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllItems$', () => {
    it('should update get all the sightings from the state', (done) => {
      service.getAllItems$().subscribe((sighs) => {
        expect(sighs).toEqual(sightings);
        done();
      });
    });
  });

  describe('verify', () => {
    it('should throw an error', () => {
      try {
        service.verifyItems(sightings[0]);
        fail();
      } catch (error) {
        expect(error).toBe('This method should not be called!');
      }
    });
  });

  describe('getNextItem', () => {
    it('should throw an error', () => {
      try {
        service.getNextItem();
        fail();
      } catch (error) {
        expect(error).toBe('This method should not be called!');
      }
    });
  });

  describe('updateItem$', () => {
    it('should call the service to put the item', () => {
      const expected: Sighting = { id: 0, pokemonId: 1, userId: 2 };
      service.updateItem$(expected).subscribe((sighting) => {
        expect(fetchServiceSpy.put$).toHaveBeenCalledOnceWith(expected);
        expect(sighting).toBe(EMPTY_SIGHTING);
      });
    });
  });
});
