import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Pokemon, { EMPTY_POKEMON } from 'src/app/models/Pokemon';
import { FetchService } from 'src/app/services/fetch.service.interface';
import { FETCH_SERVICE } from 'src/app/services/fetch.service.token';
import { VerificationService } from 'src/app/services/verification.service.interface';
import { VERIFICATION_SERVICE } from 'src/app/services/verification.service.token';

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

  constructor(@Inject(VERIFICATION_SERVICE) private pokemonVerificationService: VerificationService<Pokemon>, @Inject(FETCH_SERVICE) private pokeFetchService: FetchService<Pokemon>) { }

  ngOnInit(): void {
  }

  public onSubmit = () => {
    const toBeTested = <Pokemon>{ name: this.inputGuess.value };
    this.pokemonVerificationService.verify(toBeTested, this.poke);
  }



}

export interface WhosThatPokemonInterface {
  poke: Pokemon,
  formGroup: FormGroup,
  onSubmit: () => void
}