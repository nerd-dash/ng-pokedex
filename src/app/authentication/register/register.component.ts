import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthService } from 'src/app/models/AuthService';
import { User } from 'src/app/models/User';
import { USER_AUTH_SERVICE } from 'src/app/tokens/user-auth-service.token';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    @Inject(USER_AUTH_SERVICE)
    private authService: AuthService<User, AccessToken<User>>,
    private router: Router
  ) {}

  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);

  formGroup = new FormGroup({
    email: this.email,
    password: this.password,
  });

  ngOnInit(): void {}

  onSubmit = () =>
    this.authService
      .register$(this.formGroup.value)
      .pipe(first())
      .subscribe(() => this.router.navigate(['/login']));
}
