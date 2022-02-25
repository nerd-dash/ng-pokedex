import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserAuthService } from '../services/user-auth/user-auth.service';
import { USER_AUTH_SERVICE } from '../tokens/user-auth-service.token';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule],
  providers: [
    {
      provide: USER_AUTH_SERVICE,
      useExisting: UserAuthService,
    },
  ],
})
export class AuthenticationModule {}
