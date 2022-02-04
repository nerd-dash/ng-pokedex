import { UtilsService } from "./utils.service";


describe('UtilsService', () => {

    let service : UtilsService;

    beforeEach(() => {
        service = new UtilsService();
    })

    describe('getRandomIndex', () => {
        it('should return a random index of a array', () => {

            const arr = [0, 1, 2, 3];

            const spyRandom = spyOn(Math, 'random').and.returnValue(0);
            const spyFloor = spyOn(Math, 'floor').and.returnValue(0);

            expect(service.getRandomIndex(arr)).toBe(0);
            expect(spyFloor).toHaveBeenCalledTimes(1);
            expect(spyRandom).toHaveBeenCalledTimes(1);

        })
    })

})