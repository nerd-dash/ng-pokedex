import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import Pokemon from 'src/app/models/Pokemon';

import { SeenPokeCardComponent } from './seen-poke-card.component';

describe('SeenPokeCardComponent', () => {
  let component: SeenPokeCardComponent;
  let fixture: ComponentFixture<SeenPokeCardComponent>;
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
      declarations: [SeenPokeCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeenPokeCardComponent);
    component = fixture.componentInstance;
    component.poke = { ...pokemon, base: pokemon.base };
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the number of the pokemon', () => {
    expect(compiled.querySelector('[data-test="poke-id"]')).not.toBeNull();
    expect(component.poke.id).toEqual(pokemon.id);
  });

  it('should display the name of the pokemon', () => {
    expect(compiled.querySelector('[data-test="poke-name"]')).not.toBeNull();
    expect(component.poke.name).toEqual(pokemon.name);
  });

  it('should display the image of the pokemon', () => {
    expect(compiled.querySelector('[data-test="poke-image"]')).not.toBeNull();
    expect(component.poke.image).toEqual(pokemon.image);
  });

  it('should display a seen pokemon ', () => {
    component.poke.seen = true;
    fixture.detectChanges();
    const pokeImageElement = compiled.querySelector('[data-test="poke-image"]');
    expect(pokeImageElement).not.toBeNull();
    const brightness =
      pokeImageElement && getComputedStyle(pokeImageElement).filter;
    expect(brightness).toBe('brightness(1)');
  });
});
