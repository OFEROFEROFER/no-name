import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VideoResults } from '../views/search/model';

@Pipe({
  name: 'videoUrl',
  standalone: true
})
export class VideoUrlPipe implements PipeTransform {

  // readonly youtubePrefix='https://www.youtube.com/embed/'

  constructor(private sanitizer: DomSanitizer) {}
  
  transform(url: string, ...args: unknown[]): SafeResourceUrl  {
    // let key = ""
    // if(videos){
    //   const trailers = videos.filter(video=>video.type === 'Trailer')
    //   if(trailers.length>0){
    //     key = trailers[0].key
    //   }
    // }
    // const url2 = `${this.youtubePrefix}${key}`
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
