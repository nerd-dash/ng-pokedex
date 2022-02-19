import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should contain a navbar base structure', () => {
    expect(compiled.querySelector('[data-test="nav"]')).not.toBeNull();
    expect(compiled.querySelector('[data-test="ul"]')).not.toBeNull();
  });

  it('it should contain links to the features', () => {
    const whosThatPokeLink = compiled.querySelector(
      '[data-test="whos-that-poke-link"]'
    );
    const pokedexLink = compiled.querySelector('[data-test="pokedex-link"]');

    expect(whosThatPokeLink).not.toBeNull();
    expect(pokedexLink).not.toBeNull();

    expect(whosThatPokeLink?.getAttribute(`routerlink`)).not.toBeNull();
    expect(pokedexLink?.getAttribute(`routerlink`)).not.toBeNull();
  });
});
