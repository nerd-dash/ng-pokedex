import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhosThatPokemonComponent } from './whos-that-pokemon.component';

describe('WhosThatPokemonComponent', () => {
  let component: WhosThatPokemonComponent;
  let fixture: ComponentFixture<WhosThatPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhosThatPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhosThatPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
