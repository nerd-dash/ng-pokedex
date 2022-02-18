import { NgModule } from '@angular/core';
import { LazyImgDirective } from './lazy-img.directive';

@NgModule({
  declarations: [LazyImgDirective],
  exports: [LazyImgDirective],
})
export class LazyImgDirectiveModule {}
