import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { FetchService } from 'src/app/services/fetch.service.interface';
import { FETCH_SERVICE } from 'src/app/services/fetch.service.token';
import { UtilsService } from 'src/app/services/utils.service';
import { VERIFICATION_SERVICE } from 'src/app/services/verification.service.token';
import { PokemonFetchServiceSpy } from 'src/app/utils/testing/pokemon-fetch.service.spy';
import { PokemonVerificationServiceSpy } from 'src/app/utils/testing/pokemon-verification.service.spy';
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

  let pokeFetchServiceSpy: jasmine.SpyObj<FetchService<Pokemon>>


  beforeEach(async () => {

    pokeFetchServiceSpy = PokemonFetchServiceSpy.ProvideSpy();

    await TestBed.configureTestingModule({
      declarations: [PokegameComponent, FakeWhosThatPokemonComponent],
      providers: [
        { provide: FETCH_SERVICE, useValue: pokeFetchServiceSpy },
        { provide: UtilsService, useValue: UtilsService.ProvideSpy() },
        { provide: VERIFICATION_SERVICE, useValue: PokemonVerificationServiceSpy.ProvideSpy() }

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
