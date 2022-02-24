import { GameState } from '../../models/GameState';
import { StateService } from './state.service';

const initialState: GameState<number> = {
  allItems: [0, 1, 2, 3, 4, 5, 6],
  item: 0,
};

class DummyStateService extends StateService<GameState<number>> {
  constructor(initialState: GameState<number>) {
    super(initialState);
  }

  publicSelect$ = this.select((state) => state);
}

describe('StateService', () => {
  let service: DummyStateService;
  beforeEach(() => {
    service = new DummyStateService(initialState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('publicSelect$ should return the full state', (done) => {
    service.publicSelect$
      .subscribe((state) => {
        expect(state).toEqual(initialState);
        done();
      })
      .unsubscribe();
  });
});
