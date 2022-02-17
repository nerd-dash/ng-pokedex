import { UtilsService } from 'src/app/services/utils.service';

export abstract class UtilsServiceSpy {
  public static ProvideSpy = (): jasmine.SpyObj<UtilsService> => {
    const utilsServiceSpy = jasmine.createSpyObj<UtilsService>([
      'getRandomIndex',
      'getRandomNumber',
    ]);

    utilsServiceSpy.getRandomIndex.and.returnValue(0);
    utilsServiceSpy.getRandomNumber.and.returnValue(0);

    return utilsServiceSpy;
  };
}
