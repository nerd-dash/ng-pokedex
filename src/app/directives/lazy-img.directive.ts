import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'img[lazy-src]',
})
export class LazyImgDirective {
  constructor(private elementRef: ElementRef<HTMLImageElement>) {}

  @Input('lazy-src') set lazySrc(src: string) {
    const rootMargin = `${this.elementRef.nativeElement.height || 100}px`;

    const options: IntersectionObserverInit = {
      threshold: 1,
    };
    const observer = new IntersectionObserver((entries) => {
      this.substituteSrc(entries, observer, src);
    }, options);

    observer.observe(this.elementRef.nativeElement);
  }

  private substituteSrc = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver,
    src: string
  ) => {
    entries.forEach((element) => {
      /* istanbul ignore if */
      if (!element.isIntersecting) {
        return;
      }
      element.target.setAttribute('src', src);
      observer.unobserve(element.target);
    });
  };
}
