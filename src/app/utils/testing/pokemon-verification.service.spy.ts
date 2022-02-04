import Pokemon from "src/app/models/Pokemon";
import { VerificationService } from "src/app/services/verification.service.interface";

export abstract class PokemonVerificationServiceSpy {
  public static ProvideSpy = (): jasmine.SpyObj<VerificationService<Pokemon>> => {
    const verificationServiceSpy = jasmine.createSpyObj<VerificationService<Pokemon>>([
      'verify',
    ]);

    verificationServiceSpy.verify.and.returnValue(false);

    return verificationServiceSpy;
  };
}
