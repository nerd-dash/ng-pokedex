import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import Pokemon from '../../models/Pokemon';
import { pokes } from '../../utils/testing/pokes';
import { PokemonFetchService } from './pokemon-fetch.service';

describe('PokemonFetchService', () => {
  let service: PokemonFetchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonFetchService],
    });
    service = TestBed.inject(PokemonFetchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should make a GET request to pokemon Json and return an observable with all pokemon data', () => {
      service.getAll$().subscribe((pokemons) => {
        expect(pokemons).toBe(pokes);
      });

      const req = httpTestingController.expectOne(
        `${environment.POKE_SERVER_BASE_URL}`
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
        `${environment.POKE_SERVER_BASE_URL}/${id}`
      );

      expect(req.request.method).toEqual('GET');

      req.flush(pokes[0]);
    });
  });

  describe('put$', () => {
    it('should make a PUT request to pokmeon api update', () => {
      const poke: Pokemon = { ...pokes[2] };
      service.put$(poke).subscribe((pokemon) => {
        expect(pokemon).toBe(pokes[0]);
      });

      const req = httpTestingController.expectOne(
        `${environment.POKE_SERVER_BASE_URL}/${poke.id}`
      );

      expect(req.request.method).toEqual('PUT');

      req.flush(pokes[0]);
    });
  });

  describe('post$', () => {
    it('should throw an error', () => {
      try {
        service.post$(pokes[0]);
        fail();
      } catch (error) {
        expect(error).toBe('Method not allowed!');
      }
    });
  });

  describe('patch$', () => {
    it('should throw an error', () => {
      try {
        service.patch$(pokes[0]);
        fail();
      } catch (error) {
        expect(error).toBe('Method not allowed!');
      }
    });
  });

  describe('delete$', () => {
    it('should throw an error', () => {
      try {
        service.delete$(pokes[0]);
        fail();
      } catch (error) {
        expect(error).toBe('Method not allowed!');
      }
    });
  });
});
