import { TestBed } from '@angular/core/testing';
import { pokes } from '../utils/testing/pokes';

import { PokemonVerificationService } from './pokemon-verification.service';

describe('PokemonVerificationService', () => {
  let service: PokemonVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonVerificationService]
    });
    service = TestBed.inject(PokemonVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify if the passed name is the same name of the pokemon', ()=> {
    expect(service.verify({name: 'a Weird poke'}, pokes[0])).toBeFalse();
    expect(service.verify({name: 'Venusaur'}, pokes[2])).toBeTruthy();
  })
});
