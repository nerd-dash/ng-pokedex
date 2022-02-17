import { of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';
import Pokemon from 'src/app/models/Pokemon';
import { pokes } from './pokes';

export class PokemonGameStateServiceSpy {
  public provideSpy = (): jasmine.SpyObj<GameStateService<Pokemon>> => {
    const verificationServiceSpy = jasmine.createSpyObj<
      GameStateService<Pokemon>
    >(['verify$', 'getNextRound$']);

    verificationServiceSpy.verify$.and.returnValue(of(false));
    verificationServiceSpy.getNextRound$.and.returnValue(of(pokes[0]));
    verificationServiceSpy.getRandom$ = of(pokes[0]);

    return verificationServiceSpy;
  };
}
