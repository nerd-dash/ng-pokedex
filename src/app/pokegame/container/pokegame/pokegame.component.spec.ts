import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GameStateService } from 'src/app/models/GameStateService';
import Pokemon from 'src/app/models/Pokemon';
import { Sighting } from 'src/app/models/Sighting';
import { POKEMON_GAME_STATE_SERVICE } from 'src/app/tokens/game-state/pokemon-game-state-service.token';
import { SIGHTING_GAME_STATE_SERVICE } from 'src/app/tokens/game-state/sighting-game-state-service.token';
import { PokegameComponent } from './pokegame.component';

describe('PokegameComponent', () => {
  let component: PokegameComponent;
  let fixture: ComponentFixture<PokegameComponent>;
  let gameStateServiceSpy: jasmine.SpyObj<GameStateService<Pokemon>>;
  let sightingGameStateServiceSpy: jasmine.SpyObj<GameStateService<Sighting>>;

  beforeEach(async () => {
    gameStateServiceSpy = jasmine.createSpyObj<GameStateService<Pokemon>>({
      initiateState$: of(undefined),
    });
    sightingGameStateServiceSpy = jasmine.createSpyObj<
      GameStateService<Sighting>
    >({
      initiateState$: of(undefined),
    });

    await TestBed.configureTestingModule({
      declarations: [PokegameComponent],
      providers: [
        { provide: POKEMON_GAME_STATE_SERVICE, useValue: gameStateServiceSpy },
        {
          provide: SIGHTING_GAME_STATE_SERVICE,
          useValue: sightingGameStateServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokegameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the states for the game.', () => {
    expect(gameStateServiceSpy.initiateState$).toHaveBeenCalledTimes(1);
    expect(sightingGameStateServiceSpy.initiateState$).toHaveBeenCalledTimes(1);
  });
});
