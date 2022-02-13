import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { GameStateService } from 'src/app/services/game-state.service.interface';
import { GAME_STATE_SERVICE } from 'src/app/services/game-state.service.token';
import { PokemonGameStateServiceSpy } from 'src/app/utils/testing/pokemon-game-state.service.spy';
import { pokes } from 'src/app/utils/testing/pokes';
import { WhosThatPokemonComponent } from '../whos-that-pokemon/whos-that-pokemon.component';
import { PokegameComponent } from './pokegame.component';

@Component({
  selector: 'app-whos-that-pokemon',
  template: ''
})
class FakeWhosThatPokemonComponent extends WhosThatPokemonComponent { }


describe('PokegameComponent', () => {
  let component: PokegameComponent;
  let fixture: ComponentFixture<PokegameComponent>;
  let compiled: HTMLElement;

  let childComponentEl: DebugElement;
  let childComponent: FakeWhosThatPokemonComponent;

  let pokemonGameStateSpy: GameStateService<Pokemon>;

  beforeEach(async () => {

    pokemonGameStateSpy = PokemonGameStateServiceSpy.ProvideSpy();
    pokemonGameStateSpy.getRandom$ = of(pokes[0]);


    await TestBed.configureTestingModule({
      declarations: [PokegameComponent, FakeWhosThatPokemonComponent],
      providers: [
        { provide: GAME_STATE_SERVICE, useValue: pokemonGameStateSpy }

      ]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(PokegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    childComponentEl = fixture.debugElement.query(By.directive(FakeWhosThatPokemonComponent));
    childComponent = childComponentEl.injector.get(FakeWhosThatPokemonComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a randon not seen pokemon', () => {

    component.randomPoke$
      .subscribe((randomPoke) => {
        expect(randomPoke).not.toEqual(EMPTY_POKEMON);
        expect(randomPoke).toBe(pokes[0]);
      })
      .unsubscribe();
  });

  it('should render whos that pokemon component', () => {
    expect(compiled.querySelector('[data-test="whos-that-poke"]')).not.toBeNull();
  })

  it('should pass a random pokemon to whos that poke component', () => {
    expect(childComponent.poke).toBe(pokes[0]);
  });
});
