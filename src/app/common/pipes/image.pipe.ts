import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {

  readonly imagePrefix = 'https://image.tmdb.org/t/p/w92'
  transform(imageSuffix: string, ...args: unknown[]): unknown {
    return `${this.imagePrefix}${imageSuffix}`;
  }

}
