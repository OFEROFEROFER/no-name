import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appFallback]',
  standalone: true
})
export class FallbackDirective {

  @HostListener('error', ['$event'])
  handleImageError(event: Event): void {
    const image = event.target as HTMLInputElement;
    image.src = "assets/no_image.png"; // e.g. ./assets/images/default-image.png
  }

  constructor() { 
    //this.src = "//src/assets/no_image.png"
  }

}
