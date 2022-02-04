import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FetchService } from 'src/app/services/fetch.service.interface';
import { FETCH_SERVICE } from 'src/app/services/fetch.service.token';
import { PokemonFetchServiceSpy } from 'src/app/utils/testing/pokemon-fetch.service.spy';
import Pokemon, { EMPTY_POKEMON } from '../../../models/Pokemon';
import { PokeCardComponent } from '../../component/poke-card/poke-card.component';
import { PokeListComponent } from './poke-list.component';

@Component({
  selector: 'app-poke-card',
  template: ''
})
class FakePokeCardComponent extends PokeCardComponent { }


describe('PokeListComponent', () => {
  let component: PokeListComponent;
  let fixture: ComponentFixture<PokeListComponent>;
  let compiled: HTMLElement;

  let childComponentEl: DebugElement;
  let childComponent: PokeCardComponent;

  let pokeFetchServiceSpy: jasmine.SpyObj<FetchService<Pokemon>>

  beforeEach(async () => {

    pokeFetchServiceSpy = PokemonFetchServiceSpy.ProvideSpy();

    await TestBed.configureTestingModule({
      declarations: [FakePokeCardComponent, PokeListComponent],
      providers: [
        { provide: FETCH_SERVICE, useValue: pokeFetchServiceSpy },

      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeListComponent);
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
