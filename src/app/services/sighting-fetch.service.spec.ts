import { HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { Sighting } from '../models/Sighting';

import { SightingFetchService } from './sighting-fetch.service';

const sighting: Sighting = {
  id: 1,
  pokemonId: 1,
  userId: 2,
};

describe('SightingFetchService', () => {
  let service: SightingFetchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SightingFetchService],
    });
    service = TestBed.inject(SightingFetchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should make a GET request to sighting and return an observable with all sighting data', () => {

      const params : HttpParams = new HttpParams().set('id', '1');

      service.getAll$(params).subscribe((sightings) => {
        expect(sightings).toEqual([sighting]);
      });

      const req = httpTestingController.expectOne(
        `${environment.SERVER_BASE_URL}/sighting?id=1`
      );

      expect(req.request.method).toEqual('GET');

      req.flush([sighting]);
    });
  });

  describe('get$', () => {
    it('should make a GET request to sighting and return an observable with requested sighting data', () => {
      const id = 1;
      service.get$(id).subscribe((sighting) => {
        expect(sighting).toBe(sighting);
      });

      const req = httpTestingController.expectOne(
        `${environment.SERVER_BASE_URL}/sighting/${id}`
      );

      expect(req.request.method).toEqual('GET');

      req.flush(sighting);
    });
  });

  describe('put$', () => {
    it('should make a PUT request to sighting api update', () => {
      const sight: Sighting = { ...sighting, pokemonId: 134 };
      service.put$(sight).subscribe((sighting) => {
        expect(sighting).toBe(sight);
      });

      const req = httpTestingController.expectOne(
        `${environment.SERVER_BASE_URL}/sighting/${sight.id}`
      );

      expect(req.request.method).toEqual('PATCH');

      req.flush(sight);
    });
  });

});
