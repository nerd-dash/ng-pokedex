import {
  Component,
  DebugElement,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';
import { EMPTY_POKEDEX_ENTRY } from 'src/app/models/PokedexEntry';
import Pokemon from 'src/app/models/Pokemon';
import { POKEMON_GAME_STATE_SERVICE } from 'src/app/tokens/game-state/pokemon-game-state-service.token';
import { pokedexEntries } from 'src/app/utils/testing/pokes';
import { WhosThatPokemonInterface } from '../whos-that-pokemon/whos-that-pokemon.component';
import { RandomPokemonComponent } from './random-pokemon.component';

@Component({
  selector: 'app-whos-that-pokemon',
  template: '',
})
class FakeWhosThatPokemonComponent implements WhosThatPokemonInterface {
  @Input() pokedexEntry = EMPTY_POKEDEX_ENTRY;
  formGroup = new FormGroup({});
  onSubmit = () => {};
  nextPokemon = () => {};
}

describe('RandomPokemonComponent', () => {
  let component: RandomPokemonComponent;
  let fixture: ComponentFixture<RandomPokemonComponent>;
  let compiled: HTMLElement;

  let childComponentEl: DebugElement;
  let childComponent: FakeWhosThatPokemonComponent;

  let pokemonGameStateServiceSpy: jasmine.SpyObj<GameStateService<Pokemon>>;

  const bulbasaur = pokedexEntries[0];

  beforeEach(async () => {
    pokemonGameStateServiceSpy = jasmine.createSpyObj<
      GameStateService<Pokemon>
    >({ getItem$: of(bulbasaur) });

    await TestBed.configureTestingModule({
      declarations: [RandomPokemonComponent, FakeWhosThatPokemonComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: POKEMON_GAME_STATE_SERVICE,
          useValue: pokemonGameStateServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomPokemonComponent);
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
      expect(randomPoke).not.toEqual(EMPTY_POKEDEX_ENTRY);
      expect(randomPoke).toBe(pokedexEntries[0]);
    });
  });

  it('should render whos that pokemon component', () => {
    expect(
      compiled.querySelector('[data-test="whos-that-poke"]')
    ).not.toBeNull();
  });

  it('should pass a random pokemon to whos that poke component', () => {
    expect(childComponent.pokedexEntry).toBe(pokedexEntries[0]);
  });

  it('should show a loading while no pokemon has loaded', () => {
    component.randomPoke$ = of(EMPTY_POKEDEX_ENTRY);
    fixture.detectChanges();
    expect(compiled.querySelector('[data-test="loading"]')).not.toBeNull();
  });
});
