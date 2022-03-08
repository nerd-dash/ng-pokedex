import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthFetchService } from 'src/app/models/AuthFetchService';
import { POKEGAME_ROUTES } from 'src/app/models/RoutesMap';
import { User } from 'src/app/models/User';
import { AUTH_FETCH_SERVICE } from 'src/app/tokens/fetch/auth-fetch-service.token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    @Inject(AUTH_FETCH_SERVICE)
    private authService: AuthFetchService<User>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.email.setValue('ash@pokemon.com');
    this.password.setValue('iHateGary4ever');
  }

  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  formGroup = new FormGroup({
    email: this.email,
    password: this.password,
  });

  onSubmit = () =>
    this.authService
      .login$(this.formGroup.value)
      .pipe(first())
      .subscribe({
        next: () => this.router.navigate([POKEGAME_ROUTES.Pokegame]),
      });
}
