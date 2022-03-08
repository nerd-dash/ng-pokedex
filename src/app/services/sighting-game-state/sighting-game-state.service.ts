import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FetchService } from 'src/app/models/FetchService';
import { GameState } from 'src/app/models/GameState';
import { GameStateService } from 'src/app/models/GameStateService';
import { EMPTY_SIGHTING, Sighting } from 'src/app/models/Sighting';
import { SIGHTING_FETCH_SERVICE } from 'src/app/tokens/fetch/sighting-fetch-service.token';
import { StateService } from '../state/state.service';

const initialState: GameState<Sighting> = {
  allItems: [],
  item: EMPTY_SIGHTING,
};

@Injectable({
  providedIn: 'root',
})
export class SightingGameStateService
  extends StateService<GameState<Sighting>>
  implements GameStateService<Sighting>
{
  constructor(
    @Inject(SIGHTING_FETCH_SERVICE)
    private fetchServiceSpy: FetchService<Sighting>
  ) {
    super(initialState);
  }
  getNextItem = () => {
    throw 'Method not allowed!';
  };

  verifyItems = (toBeTested: Partial<Sighting>) => {
    throw 'Method not allowed!';
  };

  getItem$ = () => {
    throw 'Method not allowed!';
  };

  getAllItems$ = (): Observable<Sighting[]> =>
    this.select((state) => state.allItems);

  updateItem$ = (item: Sighting) => {
    this.setState({
      ...this.state,
      allItems: [...this.state.allItems, item],
    });

    return this.fetchServiceSpy.post$(item);
  };

  initiateState$ = (): Observable<void> =>
    this.fetchServiceSpy.getAll$().pipe(
      map((allItems) => {
        this.setState({
          ...this.state,
          allItems,
        });
      })
    );
}
