import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokedexModule } from '../../pokedex.module';
import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let fixture: ComponentFixture<PokedexComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should hold a PokeListComponent instance', () => {
    expect(compiled.querySelector('[data-test="poke-list"]')).not.toBeNull();
  });
});
