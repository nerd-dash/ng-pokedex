import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthFetchService } from 'src/app/models/AuthFetchService';
import { AUTH_ROUTES } from 'src/app/models/RoutesMap';
import { User } from 'src/app/models/User';
import { AUTH_FETCH_SERVICE } from 'src/app/tokens/fetch/auth-fetch-service.token';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    @Inject(AUTH_FETCH_SERVICE)
    private authService: AuthFetchService<User>,
    private route: ActivatedRoute,
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
      .subscribe(() =>
        this.router.navigate([`../${AUTH_ROUTES.Login}`], {
          relativeTo: this.route,
        })
      );
}
