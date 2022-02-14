import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { GameStateService } from 'src/app/models/GameStateService';
import { GAME_STATE_SERVICE } from 'src/app/tokens/game-state.service.token';

@Component({
  selector: 'app-whos-that-pokemon',
  templateUrl: './whos-that-pokemon.component.html',
  styleUrls: ['./whos-that-pokemon.component.scss']
})
export class WhosThatPokemonComponent implements WhosThatPokemonInterface, OnInit {
  @Input() public poke: Pokemon = EMPTY_POKEMON;

  private inputGuess = new FormControl('', Validators.required)

  public formGroup: FormGroup = new FormGroup({
    inputGuess: this.inputGuess
  })

  constructor(@Inject(GAME_STATE_SERVICE) private pokemonGameStateService: GameStateService<Pokemon>) { }

  ngOnInit(): void { }

  public onSubmit = () => {
    const toBeTested = <Pokemon>{ name: this.inputGuess.value };
    this.pokemonGameStateService.verify$(toBeTested, this.poke);
  }

  public nextPokemon= () => {
    this.pokemonGameStateService.getNextRound();
  };


}

export interface WhosThatPokemonInterface {
  poke: Pokemon,
  formGroup: FormGroup,
  onSubmit: () => void,
  nextPokemon: () => void,
}