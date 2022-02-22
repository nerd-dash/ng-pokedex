import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FetchService } from '../models/FetchService';
import { GameState } from '../models/GameState';
import { GameStateService } from '../models/GameStateService';
import Pokemon, { EMPTY_POKEMON } from '../models/Pokemon';
import { EMPTY_SIGHTING, Sighting } from '../models/Sighting';
import { POKEMON_FETCH_SERVICE } from '../tokens/fetch/pokemon-fetch-service.token';
import { SIGHTING_GAME_STATE_SERVICE } from '../tokens/game-state/sighting-game-state-service.token';
import { pokedexEntries, pokes } from '../utils/testing/pokes';
import { PokemonGameStateService } from './pokemon-game-state.service';
import { UtilsService } from './utils.service';

fdescribe('PokemonGameStateService', () => {
  let service: PokemonGameStateService;
  let pokemonFetchServiceSpy: jasmine.SpyObj<FetchService<Pokemon>>;
  let utilsServiceSpy: jasmine.SpyObj<UtilsService>;
  let sightingGameStateSpy: GameStateService<Sighting>;

  const venusaur = pokes[2];

  beforeEach(() => {
    pokemonFetchServiceSpy = jasmine.createSpyObj<FetchService<Pokemon>>({
      put$: of(venusaur),
      getAll$: of(pokes),
    });

    utilsServiceSpy = jasmine.createSpyObj<UtilsService>({
      getRandomItem: venusaur,
      getRandomNumber: 0,
      hasTheSameName: true,
    });

    sightingGameStateSpy = jasmine.createSpyObj<GameStateService<Sighting>>({
      getAllItems$: of([]),
      getItem$: of(EMPTY_SIGHTING),
      getNextItem: undefined,
      updateItem$: of(EMPTY_SIGHTING),
    });

    TestBed.configureTestingModule({
      providers: [
        PokemonGameStateService,
        { provide: POKEMON_FETCH_SERVICE, useValue: pokemonFetchServiceSpy },
        {
          provide: SIGHTING_GAME_STATE_SERVICE,
          useValue: sightingGameStateSpy,
        },
        { provide: UtilsService, useValue: utilsServiceSpy },
      ],
    });
    service = TestBed.inject(PokemonGameStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllItems$', () => {
    it('should update get all the pokemons from the state', (done) => {
      service.getAllItems$().subscribe((pokemons) => {
        expect(pokemons).toEqual(pokedexEntries);
        done();
      });
    });
  });

  describe('verifyItems', () => {
    describe('returning true', () => {
      beforeEach(() => {
        utilsServiceSpy.hasTheSameName.and.returnValue(true);
      });

      it('should return true if the names of pokemons are the same', () => {
        expect(service.verifyItems({ name: 'venusaur' })).toBeTrue();
      });

      it('should before return true it should update the state making the pokemon seen', () => {
        expect(service.verifyItems({ name: 'venusaur' })).toBeTrue();
        service.getItem$().subscribe((seenPoke) => {
          expect(sightingGameStateSpy.updateItem$).toHaveBeenCalledWith({
            id: 0,
            pokemonId: seenPoke.id,
          });
          expect(seenPoke.name).toBe(venusaur.name);
        });
      });
    });

    describe('returning false', () => {
      beforeEach(() => {
        utilsServiceSpy.hasTheSameName.and.returnValue(false);
      });

      afterEach(() => {
        utilsServiceSpy.hasTheSameName.calls.reset();
        utilsServiceSpy.getRandomItem.calls.reset();
      });

      it('should return false if the names of pokemons are NOT the same', () => {
        expect(service.verifyItems({ name: 'Notvenusaur' })).toBeFalse();
        expect(utilsServiceSpy.hasTheSameName).toHaveBeenCalledTimes(1);
      });

      it('should before return false it should update the state with another unseen pokemon', () => {
        const bulbasaur = pokes[0];
        utilsServiceSpy.getRandomItem.and.returnValue(bulbasaur);

        expect(service.verifyItems({ name: 'Notvenusaur' })).toBeFalse();

        expect(utilsServiceSpy.hasTheSameName).toHaveBeenCalledTimes(1);
        expect(utilsServiceSpy.getRandomItem).toHaveBeenCalledTimes(2);

        service.getItem$().subscribe((seenPoke) => {
          expect(seenPoke.name).not.toBe(venusaur.name);
        });
      });
    });
  });

  describe(`getItem$`, () => {
    it('should fetch a randon not seen pokemon', () => {
      service
        .getItem$()
        .subscribe((randomPoke) => {
          expect(randomPoke).not.toEqual(EMPTY_POKEMON);
          expect(randomPoke).toBe(venusaur);
        })
        .unsubscribe();
    });
  });

  describe(`getNextItem`, () => {
    afterEach(() => {
      utilsServiceSpy.getRandomItem.calls.reset();
    });

    it('should fetch a randon not seen pokemon', () => {
      service.getNextItem();

      const unseenPokemons = pokedexEntries.filter((poke) => !poke.seen);

      expect(utilsServiceSpy.getRandomItem).toHaveBeenCalledTimes(2);
      expect(utilsServiceSpy.getRandomItem).toHaveBeenCalledWith(
        unseenPokemons
      );

      service
        .getItem$()
        .subscribe((randomPoke) => {
          expect(randomPoke).not.toEqual(EMPTY_POKEMON);
          expect(randomPoke).toBe(venusaur);
        })
        .unsubscribe();
    });
  });
});
