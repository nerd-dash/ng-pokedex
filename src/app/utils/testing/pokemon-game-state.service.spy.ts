import { of } from "rxjs";
import Pokemon from "src/app/models/Pokemon";
import { GameStateService } from "src/app/models/GameStateService";

export abstract class PokemonGameStateServiceSpy {
  public static ProvideSpy = (): jasmine.SpyObj<GameStateService<Pokemon>> => {
    const verificationServiceSpy = jasmine.createSpyObj<GameStateService<Pokemon>>([
      'verify$',
      'getNextRound'      
    ]);

    verificationServiceSpy.verify$.and.returnValue(of(false));
    verificationServiceSpy.getNextRound.and.returnValue();

    return verificationServiceSpy;
  };
}
