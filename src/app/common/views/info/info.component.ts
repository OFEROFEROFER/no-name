import { Component, OnInit } from '@angular/core';
import { PersistentService } from '../../../core/services/persistent.service';
import { MoviesApiService } from '../../../core/services/movies-api.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { GetMovieInfoModel } from '../search/model';
import { CommonModule } from '@angular/common';
import { ImagePipe } from "../../pipes/image.pipe";
import { FallbackDirective } from '../../directives/fallback.directive';
import { VideoUrlPipe } from "../../pipes/video-url.pipe";
import { ExtractTrailerPipe } from "../../pipes/extract-trailer.pipe";
import { StarRatingComponent } from "../../components/star-rating/star-rating.component";

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [RouterModule, CommonModule, ImagePipe, FallbackDirective, VideoUrlPipe, ExtractTrailerPipe, StarRatingComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit{

  info$! :Observable<GetMovieInfoModel>
  // readonly youtubePath = 'https://www.youtube.com/embed/'

 
  constructor(private persistentService:PersistentService,
    private moviesApiService:MoviesApiService,
    private actionRoute: ActivatedRoute
  ){
     
  }

  ngOnInit(): void {
   
    const movieID = +this.actionRoute.snapshot.queryParamMap.get('id')!;
    this.info$ = this.moviesApiService.getMoviesInfo(movieID).pipe(tap(info=>{      
    }))
  }
}

