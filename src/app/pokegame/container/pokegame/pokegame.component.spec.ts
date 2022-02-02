import { ComponentFixture, TestBed } from '@angular/core/testing';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { FETCH_SERVICE } from 'src/app/services/fetch.service.token';
import { PokeServiceSpy } from 'src/app/utils/testing/poke.service.spy';
import { pokes } from 'src/app/utils/testing/pokes';

import { PokegameComponent } from './pokegame.component';

describe('PokegameComponent', () => {
  let component: PokegameComponent;
  let fixture: ComponentFixture<PokegameComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokegameComponent],
      providers: [
        { provide: FETCH_SERVICE, useValue: PokeServiceSpy.provide() },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a randon not seen pokemon', () => {
    component.randomPoke$
      .subscribe((randomPoke) => {
        console.log(randomPoke);
        expect(randomPoke).not.toEqual(EMPTY_POKEMON);
        expect(randomPoke).toBe(pokes[0]);
      })
      .unsubscribe();
  });
});
