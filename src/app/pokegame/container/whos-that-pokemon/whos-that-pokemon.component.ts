import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GameStateService } from 'src/app/models/GameStateService';
import { EMPTY_POKEDEX_ENTRY, PokedexEntry } from 'src/app/models/PokedexEntry';
import Pokemon from 'src/app/models/Pokemon';
import { POKEMON_GAME_STATE_SERVICE } from 'src/app/tokens/game-state/pokemon-game-state-service.token';

@Component({
  selector: 'app-whos-that-pokemon',
  templateUrl: './whos-that-pokemon.component.html',
  styleUrls: ['./whos-that-pokemon.component.scss'],
})
export class WhosThatPokemonComponent
  implements WhosThatPokemonInterface, OnInit
{
  @Input() public pokedexEntry: PokedexEntry = EMPTY_POKEDEX_ENTRY;

  private inputGuess = new FormControl('', Validators.required);

  public formGroup: FormGroup = new FormGroup({
    inputGuess: this.inputGuess,
  });

  constructor(
    @Inject(POKEMON_GAME_STATE_SERVICE)
    private pokemonGameStateService: GameStateService<Pokemon>
  ) {}

  ngOnInit(): void {}

  public onSubmit = () => {
    const toBeTested = <Pokemon>{ name: this.inputGuess.value };
    this.pokemonGameStateService.verifyItems(toBeTested);
  };

  public nextPokemon = () => {
    this.pokemonGameStateService.getNextItem();
  };
}

export interface WhosThatPokemonInterface {
  pokedexEntry: PokedexEntry;
  formGroup: FormGroup;
  onSubmit: () => void;
  nextPokemon: () => void;
}
