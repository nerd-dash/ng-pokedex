import { ComponentFixture, TestBed } from '@angular/core/testing';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';

import { PokeCardComponent } from './poke-card.component';

describe('PokeCardComponent', () => {
  let component: PokeCardComponent;
  let fixture: ComponentFixture<PokeCardComponent>;
  let compiled: HTMLElement;

  let pokemon: Pokemon = {
    id: 1,
    image: 'image/address',
    name: 'My Pokemon',
    type: ['unknown'],
    seen: false,
    base: {
      attack: 10,
      defense: 10,
      speed: 10,
      speedAttack: 10,
      hp: 100,
      speedDefense: 10,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeCardComponent);
    component = fixture.componentInstance;
    component.poke = { ...pokemon, base: pokemon.base };
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should display some pokemon info`, () => {
    expect(component.poke).not.toEqual(EMPTY_POKEMON);
  });

  it('should hold a pokemon card content', () => {
    expect(
      compiled.querySelector('[data-test="poke-card-content"]')
    ).not.toBeNull();
  });

  it('should display only a seen poke card', () => {
    component.poke.seen = true;
    fixture.detectChanges();
    const seenPokeCard = compiled.querySelector('[data-test="poke-seen"]');
    expect(seenPokeCard).not.toBeNull();
    const unseenPokeCard = compiled.querySelector('[data-test="poke-unseen"]');
    expect(unseenPokeCard).toBeNull();
  });

  it('should display only a unseen poke card', () => {
    component.poke.seen = false;
    fixture.detectChanges();
    const unseenPokeCard = compiled.querySelector('[data-test="poke-unseen"]');
    expect(unseenPokeCard).not.toBeNull();
    const seenPokeCard = compiled.querySelector('[data-test="poke-seen"]');
    expect(seenPokeCard).toBeNull();
  });
});
