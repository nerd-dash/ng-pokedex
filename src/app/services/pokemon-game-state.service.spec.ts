import { TestBed } from '@angular/core/testing';
import Pokemon, { EMPTY_POKEMON } from '../models/Pokemon';
import { PokemonFetchServiceSpy } from '../utils/testing/pokemon-fetch.service.spy';
import { pokes } from '../utils/testing/pokes';
import { FetchService } from '../models/FetchService';
import { FETCH_SERVICE } from '../tokens/fetch.service.token';
import { PokemonGameStateService } from './pokemon-game-state.service';
import { UtilsService } from './utils.service';


describe('PokemonGameStateService', () => {
  let service: PokemonGameStateService;
  let pokemonFetchServiceSpy: FetchService<Pokemon>;

  beforeEach(() => {

    pokemonFetchServiceSpy = PokemonFetchServiceSpy.ProvideSpy();

    TestBed.configureTestingModule({
      providers: [PokemonGameStateService,
        { provide: UtilsService, useValue: UtilsService.ProvideSpy() },
        { provide: FETCH_SERVICE, useValue: pokemonFetchServiceSpy }]
    });
    service = TestBed.inject(PokemonGameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('verify$', () => {

    beforeEach(() => {
      spyOn(service, 'getNextRound');
    })

    it('should verify if the passed name is the same name of the pokemon', () => {
      service.verify$({ name: 'a Weird poke' }, pokes[0]).subscribe(verification => {
        expect(verification).toBeFalse();
      }).unsubscribe();

      service.verify$(EMPTY_POKEMON, pokes[2]).subscribe(verification => {
        expect(verification).toBeFalse();
      }).unsubscribe();

      service.verify$(EMPTY_POKEMON, EMPTY_POKEMON).subscribe(verification => {
        expect(verification).toBeFalse();
      }).unsubscribe();

      service.verify$({ name: 'Venusaur' }, EMPTY_POKEMON).subscribe(verification => {
        expect(verification).toBeFalse();
      }).unsubscribe();

      service.verify$({ name: 'Venusaur' }, pokes[2]).subscribe(verification => {

        expect(verification).toBeTruthy();
      }).unsubscribe();
    })

    it('should call a new pokemon when its fails to verify', () => {
      service.verify$(EMPTY_POKEMON, pokes[2]).subscribe(_ => {
        expect(service.getNextRound).toHaveBeenCalledTimes(1);
      }).unsubscribe();
    })

    it('should show the pokemon when it passes', () => {

      const seenPoke: Pokemon = { ...EMPTY_POKEMON, seen: true };

      service.verify$(pokes[2], pokes[2]).subscribe(_ => {
        expect(pokemonFetchServiceSpy.put$).toHaveBeenCalledTimes(1);
        expect(pokemonFetchServiceSpy.put$).toHaveBeenCalledWith(seenPoke);
      }).unsubscribe();

      service.getRandom$.subscribe(poke => {
        expect(poke).toEqual(seenPoke);
      }).unsubscribe();
    })

  })

  describe(`getNextRound`, () => {
    it('should fetch a randon not seen pokemon', () => {

      service.getNextRound();

      service.getRandom$.subscribe((randomPoke) => {
        expect(randomPoke).not.toEqual(EMPTY_POKEMON);
        expect(randomPoke).toBe(pokes[0]);
      })
        .unsubscribe();
    });


  })
});
