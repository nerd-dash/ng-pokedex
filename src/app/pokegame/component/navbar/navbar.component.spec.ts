import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POKEGAME_ROUTES } from 'src/app/models/RoutesMap';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      schemas: [NO_ERRORS_SCHEMA],
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
    expect(component.POKEGAME_ROUTES).toEqual(POKEGAME_ROUTES);

    const whosThatPokeLink = compiled.querySelector(
      '[data-test="whos-that-poke-link"]'
    );

    const pokedexLink = compiled.querySelector('[data-test="pokedex-link"]');

    expect(whosThatPokeLink).not.toBeNull();
    expect(pokedexLink).not.toBeNull();
  });
});
