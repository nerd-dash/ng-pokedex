import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import Pokemon, { EMPTY_POKEMON } from '../models/Pokemon';
import { pokes } from '../utils/testing/pokes';
import { PokeFetchService } from './poke-fetch.service';

describe('PokeFetchService', () => {
  let service: PokeFetchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokeFetchService],
    });
    service = TestBed.inject(PokeFetchService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should make a GET request to pokemon Json and return an observable with all pokemon data', () => {
      service.getAll$().subscribe((pokemons) => {
        expect(pokemons).toBe(pokes);
      });

      const req = httpTestingController.expectOne(
        'http://localhost:3000/pokemon'
      );

      expect(req.request.method).toEqual('GET');

      req.flush(pokes);
    });
  });

  describe('get$', () => {
    it('should make a GET request to pokemon Json and return an observable with requested pokemon data', () => {
      const id = 1;
      service.get$(id).subscribe((pokemon) => {
        expect(pokemon).toBe(pokes[0]);
      });

      const req = httpTestingController.expectOne(
        `http://localhost:3000/pokemon/${id}`
      );

      expect(req.request.method).toEqual('GET');

      req.flush(pokes[0]);
    });
  });

  describe('put$', () => {
    it('should make a PUT request to pokmeon api update', () => {

      const poke : Pokemon = {... pokes[2], seen: true}
      service.put$(poke).subscribe((pokemon) => {
        expect(pokemon).toBe(pokes[0]);
      });

      const req = httpTestingController.expectOne(
        `http://localhost:3000/pokemon/${poke.id}`
      );

      expect(req.request.method).toEqual('PUT');

      req.flush(pokes[0]);
    })

  })
});
