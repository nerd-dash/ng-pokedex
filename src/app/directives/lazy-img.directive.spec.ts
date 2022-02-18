import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyImgDirective } from './lazy-img.directive';

class IntersectionObserver {
  unobserve = (target: any) => {};

  private entrieFactory = (entrie: Element): IntersectionObserverEntry => {
    return <IntersectionObserverEntry>{
      isIntersecting: true,
      target: entrie,
    };
  };

  constructor(private callback: (entries: Array<any>) => void, options: any) {}
  observe = jasmine.createSpy('observe').and.callFake((entrie: any) => {
    this.callback([this.entrieFactory(entrie)]);
  });
}
/* eslint-disable  @typescript-eslint/no-explicit-any */
(window as any).IntersectionObserver = IntersectionObserver;

@Component({
  selector: 'test',
  template: '<img [src]="src" [lazy-src]="lazySource" />',
})
class TestComponent {
  constructor() {}
  lazySource = '/lazySource';
  src = '../source';
}

describe('LazyImgDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, LazyImgDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should have replaced the src with the lazy source', () => {
    const debugEl: HTMLElement = fixture.debugElement.nativeElement;
    const img: HTMLImageElement | null = debugEl.querySelector('img');
    fixture.detectChanges();
    expect(img?.src).toBe('http://localhost:9876/lazySource');
  });
});
