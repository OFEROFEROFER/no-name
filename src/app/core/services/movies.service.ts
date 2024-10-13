import { Injectable } from '@angular/core';
import { MoviesApiService } from './movies-api.service';
import { Observable, map, of, tap } from 'rxjs';

 
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

   private genres!:GenreItem []
   private searchType: 'By Title'|'Discover'|'Popular' = 'Popular'

  constructor(private moviesApiService:MoviesApiService) {
    // this.genres$ = this.moviesApiService.getGenres() .pipe(map(genres=>genres.genres),tap())
    
   }

   

   getGenres():Observable< GenreItem []>{
    return this.genres?of(this.genres):this.moviesApiService.getGenres() .pipe(map(genres=>genres.genres),tap(genres=>{
      this.genres = genres;
    }))   
   }
}


export interface GenresModel{ 
  genres:GenreItem[]
}

export interface GenreItem{
   id:string,name:string 
}

