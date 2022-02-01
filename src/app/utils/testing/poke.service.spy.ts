import { of } from 'rxjs';
import Pokemon from 'src/app/models/Pokemon';
import { FetchService } from 'src/app/services/fetch.service.interface';
import { pokes } from './pokes';

export abstract class PokeServiceSpy {
  public static provide = (): jasmine.SpyObj<FetchService<Pokemon>> => {
    const pokeServiceSpy = jasmine.createSpyObj<FetchService<Pokemon>>([
      'getAll$',
      'get$',
    ]);
    pokeServiceSpy.getAll$.and.returnValue(of(pokes));
    pokeServiceSpy.get$.and.returnValue(of(pokes[0]));

    return pokeServiceSpy;
  };
}
