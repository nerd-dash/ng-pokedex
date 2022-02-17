import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { PokemonGameStateService } from 'src/app/services/pokemon-game-state.service';
import { GAME_STATE_SERVICE } from 'src/app/tokens/game-state.service.token';
import { pokes } from 'src/app/utils/testing/pokes';
import { WhosThatPokemonInterface } from '../whos-that-pokemon/whos-that-pokemon.component';
import { PokegameComponent } from './pokegame.component';

@Component({
  selector: 'app-whos-that-pokemon',
  template: '',
})
class FakeWhosThatPokemonComponent implements WhosThatPokemonInterface {
  @Input() poke = EMPTY_POKEMON;
  formGroup = new FormGroup({});
  onSubmit = () => {};
  nextPokemon = () => {};
}

describe('PokegameComponent', () => {
  let component: PokegameComponent;
  let fixture: ComponentFixture<PokegameComponent>;
  let compiled: HTMLElement;

  let childComponentEl: DebugElement;
  let childComponent: FakeWhosThatPokemonComponent;

  let pokemonGameStateServiceSpy: jasmine.SpyObj<GameStateService<Pokemon>>;

  const bulbasaur = pokes[0];

  beforeEach(async () => {
    pokemonGameStateServiceSpy = jasmine.createSpyObj<
      GameStateService<Pokemon>
    >({ getItem$: of(bulbasaur) });

    await TestBed.configureTestingModule({
      declarations: [PokegameComponent, FakeWhosThatPokemonComponent],
      providers: [
        {
          provide: GAME_STATE_SERVICE,
          useValue: pokemonGameStateServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    childComponentEl = fixture.debugElement.query(
      By.directive(FakeWhosThatPokemonComponent)
    );
    childComponent = childComponentEl.injector.get(
      FakeWhosThatPokemonComponent
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a randon not seen pokemon', () => {
    component.randomPoke$.subscribe((randomPoke) => {
      expect(randomPoke).not.toEqual(EMPTY_POKEMON);
      expect(randomPoke).toBe(pokes[0]);
    });
  });

  it('should render whos that pokemon component', () => {
    expect(
      compiled.querySelector('[data-test="whos-that-poke"]')
    ).not.toBeNull();
  });

  it('should pass a random pokemon to whos that poke component', () => {
    expect(childComponent.poke).toBe(pokes[0]);
  });

  it('should show a loading while no pokemon has loaded', () => {
    component.randomPoke$ = of(EMPTY_POKEMON);
    fixture.detectChanges();
    expect(compiled.querySelector('[data-test="loading"]')).not.toBeNull();
  });
});
