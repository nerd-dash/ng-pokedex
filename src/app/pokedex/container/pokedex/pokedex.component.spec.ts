import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';

import { FETCH_SERVICE } from 'src/app/tokens/fetch.service.token';
import { GAME_STATE_SERVICE } from 'src/app/tokens/game-state.service.token';
import { pokes } from 'src/app/utils/testing/pokes';
import Pokemon, { EMPTY_POKEMON } from '../../../models/Pokemon';
import { PokeCardComponent } from '../../component/poke-card/poke-card.component';
import { PokedexComponent } from './pokedex.component';

@Component({
  selector: 'app-poke-card',
  template: '',
})
class FakePokeCardComponent extends PokeCardComponent {}

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;
  let compiled: HTMLElement;

  let childComponentEl: DebugElement;
  let childComponent: PokeCardComponent;

  let pokeGameStateServiceSpy: jasmine.SpyObj<GameStateService<Pokemon>>;

  beforeEach(async () => {
    pokeGameStateServiceSpy = jasmine.createSpyObj<GameStateService<Pokemon>>({
      getAllItems$: of([pokes[2]]),
    });

    await TestBed.configureTestingModule({
      declarations: [FakePokeCardComponent, PokedexComponent],
      providers: [
        { provide: GAME_STATE_SERVICE, useValue: pokeGameStateServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    childComponentEl = fixture.debugElement.query(
      By.directive(FakePokeCardComponent)
    );
    childComponent = childComponentEl.injector.get(FakePokeCardComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of Poke Cards', () => {
    expect(compiled.querySelector('[data-test="poke-card"]')).not.toBeNull();
  });

  it('should fetch a list of pokemons', () => {
    component.pokes$
      .subscribe((pokes) => {
        expect(pokes.length).not.toBe(0);
      })
      .unsubscribe();
  });

  it('should pass a pokemon to a PokeCard component', () => {
    expect(childComponent.poke).not.toEqual(EMPTY_POKEMON);
  });
});
