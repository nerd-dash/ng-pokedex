import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { PokeCardComponentInterface } from 'src/app/pokedex/component/poke-card/poke-card.component';
import { GAME_STATE_SERVICE } from 'src/app/tokens/game-state.service.token';
import { pokes } from 'src/app/utils/testing/pokes';
import { WhosThatPokemonComponent } from './whos-that-pokemon.component';

@Component({
  selector: 'app-poke-card',
  template: '',
})
class FakePokeCardComponent implements PokeCardComponentInterface {
  @Input() poke: Pokemon = EMPTY_POKEMON;
}
describe('WhosThatPokemonComponent', () => {
  let component: WhosThatPokemonComponent;
  let fixture: ComponentFixture<WhosThatPokemonComponent>;
  let compiled: HTMLElement;

  let pokemonDebugElement: DebugElement;
  let pokeCardComponent: PokeCardComponentInterface;
  let pokemonGameStateServiceSpy: jasmine.SpyObj<GameStateService<Pokemon>>;

  beforeEach(async () => {

    pokemonGameStateServiceSpy = jasmine.createSpyObj<
      GameStateService<Pokemon>
    >({
      verifyItems: false,
      getItem$: of(pokes[0]),
      getNextItem : console.log(),
    });

    await TestBed.configureTestingModule({
      declarations: [WhosThatPokemonComponent, FakePokeCardComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: GAME_STATE_SERVICE,
          useValue: pokemonGameStateServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhosThatPokemonComponent);
    component = fixture.componentInstance;
    component.poke = pokes[0];
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    pokemonDebugElement = fixture.debugElement.query(
      By.directive(FakePokeCardComponent)
    );
    pokeCardComponent = pokemonDebugElement.injector.get(FakePokeCardComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an  pokemon', () => {
    expect(compiled.querySelector('[data-test="poke-card"')).not.toBeNull();
  });

  it('should pass a poke to PokeCardComponent', () => {
    expect(pokeCardComponent.poke).toBe(pokes[0]);
  });

  it('should have an input form so you can guess the pokemons name', () => {
    expect(compiled.querySelector('[data-test="input-guess"')).not.toBeNull();
    expect(compiled.querySelector('[data-test="form-guess"')).not.toBeNull();
    expect(compiled.querySelector('[data-test="button-guess"')).not.toBeNull();
  });

  it('should contain a form group to control the form-guess', () => {
    expect(component.formGroup).not.toBeNull();
    expect(component.formGroup.get('inputGuess')).not.toBeNull();
  });

  it('should call onSubmit funcion when submmited', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const onSubmitSpy = spyOn(component, 'onSubmit');

    form.triggerEventHandler('ngSubmit', null);

    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    onSubmitSpy.calls.reset();
  });

  it('should contain a next pokemon button if the pokemon is seen', () => {
    component.poke = { ...pokes[0], seen: true };
    fixture.detectChanges();
    expect(compiled.querySelector('[data-test="button-next"')).not.toBeNull();
  });

  describe('onSubmit', () => {
    it('should call the pokemon verification service', () => {
      component.poke = pokes[0];
      const inputGuess = component.formGroup.get('inputGuess');
      inputGuess?.setValue('PIKACHU');
      const toBeTested = <Pokemon>{ name: inputGuess?.value };
      component.onSubmit();

      expect(pokemonGameStateServiceSpy.verifyItems).toHaveBeenCalledTimes(1);
      expect(pokemonGameStateServiceSpy.verifyItems).toHaveBeenCalledWith(
        toBeTested,
        pokes[0]
      );
    });
  });

  describe('nextPokemon', () => {
    it('should call a next round to the game service', () => {
      component.nextPokemon();
      expect(pokemonGameStateServiceSpy.getNextItem).toHaveBeenCalledTimes(1);
    });
  });
});
