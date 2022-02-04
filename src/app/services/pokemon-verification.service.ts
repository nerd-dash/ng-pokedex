import { Injectable } from '@angular/core';
import Pokemon from '../models/Pokemon';
import { VerificationService } from './verification.service.interface';

@Injectable()
export class PokemonVerificationService implements VerificationService<Pokemon> {

  constructor() { }
  verify = (toBeTested: Partial<Pokemon>, verified: Pokemon) => toBeTested?.name?.toLocaleLowerCase() === verified?.name?.toLocaleLowerCase();
}
