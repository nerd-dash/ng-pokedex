import { Inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
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
    private sightingFetchService: FetchService<Sighting>
  ) {
    super(initialState);
    this.init();
  }
  getNextItem = () => {
    throw 'This method should not be called!';
  };

  verifyItems = (toBeTested: Partial<Sighting>) => {
    throw 'This method should not be called!';
  };

  getItem$ = () => throwError(() => 'This method should not be called!');

  getAllItems$ = () => this.select((state) => state.allItems);

  updateItem$ = (item: Sighting) => {
    this.setState({
      ...this.state,
      allItems: [...this.state.allItems, item],
    });

    return this.sightingFetchService.put$(item);
  };

  private init = () => {
    this.sightingFetchService.getAll$().subscribe((allItems) => {
      this.setState({
        ...this.state,
        allItems,
      });
    });
  };
}
