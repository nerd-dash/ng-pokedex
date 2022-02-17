import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;
  let spyRandom: jasmine.Spy;
  let spyFloor: jasmine.Spy;

  beforeEach(() => {
    service = new UtilsService();
    spyRandom = spyOn(Math, 'random').and.returnValue(0);
    spyFloor = spyOn(Math, 'floor').and.returnValue(0);
  });

  afterEach(() => {
    spyRandom.and.callThrough();
    spyFloor.and.callThrough();

    spyRandom.calls.reset();
    spyFloor.calls.reset();
  });

  describe('getRandomItem', () => {
    it('should return a random index of a array', () => {
      const arr = [0, 1, 2, 3];

      expect(service.getRandomItem(arr)).toBe(0);
      expect(spyFloor).toHaveBeenCalledTimes(1);
      expect(spyRandom).toHaveBeenCalledTimes(1);
    });
  });

  describe('getRandomNumber', () => {
    it('should return a number between the maximun and min', () => {
      const randomNumber = service.getRandomNumber(10, 0);
      expect(randomNumber).toBeGreaterThanOrEqual(0);
      expect(randomNumber).toBeLessThanOrEqual(10);
      expect(spyFloor).toHaveBeenCalledTimes(1);
      expect(spyRandom).toHaveBeenCalledTimes(1);
    });
  });

  describe('hasTheSameName', () => {
    it('should return true if the passed objects have the same value to prop name case insensitive', () => {
      const bool = service.hasTheSameName(
        { name: 'SomeName' },
        { name: 'somename' }
      );
      expect(bool).toBeTrue();
    });

    it('should return fasle if the passed objects have not the same value to prop name case insensitive', () => {
        const bool = service.hasTheSameName(
          { name: 'SomeName' },
          { name: 'other-name' }
        );
        expect(bool).toBeFalse();
      });

    it('should return false if any of the objects are empty', () => {
      expect(service.hasTheSameName({}, { name: 'name' })).toBeFalse();
    });
  });
});
