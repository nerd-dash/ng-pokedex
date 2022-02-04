import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import Pokemon from 'src/app/models/Pokemon';
import { PokeCardComponent } from 'src/app/pokedex/component/poke-card/poke-card.component';
import { FetchService } from 'src/app/services/fetch.service.interface';
import { FETCH_SERVICE } from 'src/app/services/fetch.service.token';
import { VerificationService } from 'src/app/services/verification.service.interface';
import { VERIFICATION_SERVICE } from 'src/app/services/verification.service.token';
import { PokemonFetchServiceSpy } from 'src/app/utils/testing/pokemon-fetch.service.spy';
import { PokemonVerificationServiceSpy } from 'src/app/utils/testing/pokemon-verification.service.spy';
import { pokes } from 'src/app/utils/testing/pokes';
import { WhosThatPokemonComponent } from './whos-that-pokemon.component';


@Component({
  selector: 'app-poke-card',
  template: ''
})
class FakePokeCardComponent extends PokeCardComponent { }
describe('WhosThatPokemonComponent', () => {
  let component: WhosThatPokemonComponent;
  let fixture: ComponentFixture<WhosThatPokemonComponent>;
  let compiled: HTMLElement;

  let pokemonDebugElement: DebugElement;
  let pokeCardComponent: PokeCardComponent;
  let pokemonVerificationServiceSpy: jasmine.SpyObj<VerificationService<Pokemon>>
  let pokeFetchServiceSpy: jasmine.SpyObj<FetchService<Pokemon>>

  beforeEach(async () => {
    pokemonVerificationServiceSpy = PokemonVerificationServiceSpy.ProvideSpy();
    pokeFetchServiceSpy = PokemonFetchServiceSpy.ProvideSpy();

    await TestBed.configureTestingModule({
      declarations: [WhosThatPokemonComponent, FakePokeCardComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: VERIFICATION_SERVICE, useValue: pokemonVerificationServiceSpy },
        { provide: FETCH_SERVICE, useValue: pokeFetchServiceSpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhosThatPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    pokemonDebugElement = fixture.debugElement.query(By.directive(FakePokeCardComponent));
    pokeCardComponent = pokemonDebugElement.injector.get(FakePokeCardComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an  pokemon', () => {
    expect(compiled.querySelector('[data-test="poke-card"')).not.toBeNull();
  });

  it('should pass a poke to PokeCardComponent', () => {
    component.poke = pokes[2];
    fixture.detectChanges();
    expect(pokeCardComponent.poke).toBe(pokes[2]);
  })

  it('should have an input form so you can guess the pokemons name', () => {
    expect(compiled.querySelector('[data-test="input-guess"')).not.toBeNull();
    expect(compiled.querySelector('[data-test="form-guess"')).not.toBeNull();
    expect(compiled.querySelector('[data-test="button-guess"')).not.toBeNull();
  })

  it('should contain a form group to control the form-guess', () => {
    expect(component.formGroup).not.toBeNull();
    expect(component.formGroup.get('inputGuess')).not.toBeNull();
  })

  it('should call onSubmit funcion when submmited', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const onSubmitSpy = spyOn(component, 'onSubmit');

    form.triggerEventHandler('ngSubmit', null);

    expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    onSubmitSpy.calls.reset();
  })

  describe('onSubmit', () => {
    it('should call the pokemon verification service', () => {

      component.poke = pokes[2];
      const inputGuess = component.formGroup.get('inputGuess');
      inputGuess?.setValue('PIKACHU');
      const toBeTested = <Pokemon>{ name: inputGuess?.value };
      component.onSubmit();

      expect(pokemonVerificationServiceSpy.verify).toHaveBeenCalledTimes(1);
      expect(pokemonVerificationServiceSpy.verify).toHaveBeenCalledWith(toBeTested, pokes[2]);

    });

    it('should call update the pokemon to seen if verification passes', () => {
      fail('TODO')
    })
  })
});
