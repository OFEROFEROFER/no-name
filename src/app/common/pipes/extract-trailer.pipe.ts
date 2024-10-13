import { Pipe, PipeTransform } from '@angular/core';
import { VideoResults } from '../views/search/model';

@Pipe({
  name: 'extractTrailer',
  standalone: true
})
export class ExtractTrailerPipe implements PipeTransform {

  readonly youtubePrefix='https://www.youtube.com/embed/'

  transform(videos: VideoResults[], ...args: unknown[]): string  {
    let key = null
    if(videos){
      const trailers = videos.filter(video=>video.type === 'Trailer')
      if(trailers.length>0){
        key = trailers[0].key
      }
    }
    return key?`${this.youtubePrefix}${key}`:''
  }

}
