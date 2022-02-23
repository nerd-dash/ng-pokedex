import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { PokedexEntry } from 'src/app/models/PokedexEntry';
import { UnseenPokeCardComponent } from './unseen-poke-card.component';

describe('UnseenPokeCardComponent', () => {
  let component: UnseenPokeCardComponent;
  let fixture: ComponentFixture<UnseenPokeCardComponent>;
  let compiled: HTMLElement;

  let pokemon: PokedexEntry = {
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
      declarations: [UnseenPokeCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnseenPokeCardComponent);
    component = fixture.componentInstance;
    component.poke = { ...pokemon, base: pokemon.base };
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the image of the pokemon', () => {
    expect(compiled.querySelector('[data-test="poke-image"]')).not.toBeNull();
    expect(component.poke.image).toEqual(pokemon.image);
  });

  it('should display a unseen pokemon ', () => {
    component.poke.seen = true;
    fixture.detectChanges();
    const pokeImageElement = compiled.querySelector('[data-test="poke-image"]');
    expect(pokeImageElement).not.toBeNull();
    const brightness =
      pokeImageElement && getComputedStyle(pokeImageElement).filter;
    expect(brightness).toBe('brightness(0.1)');
  });
});
