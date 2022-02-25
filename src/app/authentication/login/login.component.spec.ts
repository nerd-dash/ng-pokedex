import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthService } from 'src/app/models/AuthService';
import { User } from 'src/app/models/User';
import { USER_AUTH_SERVICE } from 'src/app/tokens/user-auth-service.token';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: HTMLElement;
  let authServiceSpy: jasmine.SpyObj<AuthService<User, AccessToken<User>>>;
  let routerSpy: jasmine.SpyObj<Router>;

  const loginData: Partial<User> = {
    email: 'ash@pokemon.com',
    password: 'iHateGary4ever',
  };

  const user: User = {
    ...(<User>loginData),
    id: 1,
  };

  const accessToken: AccessToken<User> = {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IkFzaCIsImlhdCI6MTUxNjIzOTAyMn0.dH1suR5swdAEUvc74X2cFWLRKAOfmqatUPnC3VuExZs',
    payload: user,
  };

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj<AuthService<User, AccessToken<User>>>(
      {
        login$: of(accessToken),
      }
    );

    routerSpy = jasmine.createSpyObj<Router>({
      navigate: undefined,
    });

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: '/pokegame',
          },
        ]),
      ],
      providers: [
        {
          provide: USER_AUTH_SERVICE,
          useValue: authServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form to send data to login the user', () => {
    expect(compiled.querySelector('[data-test="form-group"]')).not.toBeNull();
    expect(compiled.querySelector('[data-test="input-email"]')).not.toBeNull();
    expect(
      compiled.querySelector('[data-test="input-password"]')
    ).not.toBeNull();
    expect(compiled.querySelector('[data-test="input-submit"]')).not.toBeNull();
  });

  describe('onSubmit', () => {
    const data: Partial<User> = {
      email: loginData.email,
      password: loginData.password,
    };

    it('should receive data and call the auth service login method with this data', () => {
      fillFormGroup();
      component.onSubmit();
      expect(authServiceSpy.login$).toHaveBeenCalledOnceWith(data);
    });

    it('should show redirect to pokegame page if login is sucessfull', (done) => {
      fillFormGroup();
      component.onSubmit();
      expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['/pokegame']);
      done();
    });
  });

  const fillFormGroup = () => {
    component.email.setValue(loginData.email);
    component.password.setValue(loginData.password);
    fixture.detectChanges();
  };
});
