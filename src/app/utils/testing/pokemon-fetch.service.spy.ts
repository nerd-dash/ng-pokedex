import { of } from 'rxjs';
import Pokemon from 'src/app/models/Pokemon';
import { FetchService } from 'src/app/models/FetchService';
import { pokes } from './pokes';

export abstract class PokemonFetchServiceSpy {
  public static ProvideSpy = (): jasmine.SpyObj<FetchService<Pokemon>> => {
    const pokeServiceSpy = jasmine.createSpyObj<FetchService<Pokemon>>([
      'getAll$',
      'get$',
      'put$'
    ]);
    pokeServiceSpy.getAll$.and.returnValue(of(pokes));
    pokeServiceSpy.get$.and.returnValue(of(pokes[0]));
    pokeServiceSpy.put$.and.returnValue(of(pokes[0]));

    return pokeServiceSpy;
  };
}
