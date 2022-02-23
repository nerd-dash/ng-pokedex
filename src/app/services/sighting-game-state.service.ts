import { Inject, Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { FetchService } from '../models/FetchService';
import { GameState } from '../models/GameState';
import { GameStateService } from '../models/GameStateService';
import { EMPTY_SIGHTING, Sighting } from '../models/Sighting';
import { SIGHTING_FETCH_SERVICE } from '../tokens/fetch/sighting-fetch-service.token';
import { sightings } from '../utils/testing/sightings';
import { StateService } from './state.service';
import { UtilsService } from './utils.service';

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
