import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FETCH_SERVICE } from 'src/app/services/fetch.service.token';
import { PokeServiceSpy } from 'src/app/utils/testing/poke.service.spy';
import Pokemon from '../../../models/Pokemon';
import { PokeCardComponent } from '../../component/poke-card/poke-card.component';
import { PokedexModule } from '../../pokedex.module';
import { PokeListComponent } from './poke-list.component';

describe('PokeListComponent', () => {
  let component: PokeListComponent;
  let fixture: ComponentFixture<PokeListComponent>;
  let compiled: HTMLElement;

  let childComponentEl: DebugElement;
  let childComponent: PokeCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexModule],
      providers: [
        { provide: FETCH_SERVICE, useValue: PokeServiceSpy.provide() },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    childComponentEl = fixture.debugElement.query(
      By.directive(PokeCardComponent)
    );
    childComponent = childComponentEl.injector.get(PokeCardComponent);
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
    expect(childComponent.poke).not.toEqual(<Pokemon>{});
  });
});
