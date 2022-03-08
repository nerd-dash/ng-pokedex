import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AccessToken } from 'src/app/models/AccessToken';
import { AuthFetchService } from 'src/app/models/AuthFetchService';
import { AUTH_ROUTES } from 'src/app/models/RoutesMap';
import { User } from 'src/app/models/User';
import { AUTH_FETCH_SERVICE } from 'src/app/tokens/fetch/auth-fetch-service.token';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthFetchService<User>>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeSpy: jasmine.SpyObj<ActivatedRoute>;
  let compiled: HTMLElement;

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
    authServiceSpy = jasmine.createSpyObj<AuthFetchService<User>>({
      register$: of(accessToken),
    });

    routeSpy = jasmine.createSpyObj<ActivatedRoute>({
      toString: '',
    });

    routerSpy = jasmine.createSpyObj<Router>({
      navigate: undefined,
    });

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: AUTH_ROUTES.Login, component: LoginComponent },
        ]),
      ],
      providers: [
        {
          provide: AUTH_FETCH_SERVICE,
          useValue: authServiceSpy,
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
        {
          provide: ActivatedRoute,
          useValue: routeSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    const data: Partial<User> = {
      email: loginData.email,
      password: loginData.password,
    };

    it('should receive data and call the auth service register method with this data', () => {
      fillFormGroup();
      component.onSubmit();
      expect(authServiceSpy.register$).toHaveBeenCalledOnceWith(data);
    });

    it('should show redirect to login page if registration is sucessfull', (done) => {
      fillFormGroup();
      component.onSubmit();
      expect(routerSpy.navigate).toHaveBeenCalledOnceWith(
        [`../${AUTH_ROUTES.Login}`],
        {
          relativeTo: routeSpy,
        }
      );
      done();
    });
  });

  it('should have a form to send data to register the user', () => {
    expect(compiled.querySelector('[data-test="form-group"]')).not.toBeNull();
    expect(compiled.querySelector('[data-test="input-email"]')).not.toBeNull();
    expect(
      compiled.querySelector('[data-test="input-password"]')
    ).not.toBeNull();
    expect(compiled.querySelector('[data-test="input-submit"]')).not.toBeNull();
  });

  const fillFormGroup = () => {
    component.email.setValue(loginData.email);
    component.password.setValue(loginData.password);
    fixture.detectChanges();
  };
});
