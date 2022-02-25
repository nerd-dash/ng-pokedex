import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthService } from 'src/app/models/AuthService';
import { User } from 'src/app/models/User';
import { USER_AUTH_SERVICE } from 'src/app/tokens/user-auth-service.token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    @Inject(USER_AUTH_SERVICE)
    private authService: AuthService<User, AccessToken<User>>,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
      .subscribe(() => this.router.navigate(['/pokegame']));
}
