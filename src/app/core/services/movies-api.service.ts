import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, timer } from 'rxjs';
import { GetMovieInfoModel, getMovieByTitleModel } from '../../common/views/search/model';
import { Cacheable } from 'ngx-cacheable';
import { GenresModel } from './movies.service';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  private readonly apiKey= 'd8b30d4cdaa4ffc58450375322104979'
  private readonly domain = 'https://api.themoviedb.org/3/'

  constructor(private httpClient:HttpClient) { 

  }

  @Cacheable({maxAge:600000,maxCacheCount: 500} )
  getMoviesByTitle(title:string,page?:number ):Observable<getMovieByTitleModel>{
      const params = new HttpParams().
      append('api_key',this.apiKey).
      append('query',title).
      append('page',page??1).
      append('include_adult','true')
      //const params2 = genres? params.append('with_genres', genres):params
      return this.httpClient.get<getMovieByTitleModel>(`${this.domain}search/movie`,{params: params})//.pipe(delay(5000))
  }

  @Cacheable({maxAge:600000,maxCacheCount: 500} )
  getMoviesInfo(id:number):Observable<GetMovieInfoModel>{
    const params = new HttpParams().
    append('api_key',this.apiKey).
    append('append_to_response','videos')
    //append('query',title)
     return this.httpClient.get<GetMovieInfoModel>(`${this.domain}movie/${id}`,{params: params})     
}
getGenres():Observable<GenresModel>{
   const params = new HttpParams().
  append('api_key',this.apiKey)
  //append('query',title)
   return this.httpClient.get<GenresModel>(`${this.domain}genre/movie/list`,{params: params})
}

getVideo(id:number){
  // /movie/218?api_key=d8b30d4cdaa4ffc58450375322104979&append_to_response=videos
  const params = new HttpParams().
  append('api_key',this.apiKey).
  append('append_to_response','videos')
  return this.httpClient.get<GenresModel>(`${this.domain}genre/movie/list`,{params: params})
}

  getPopularMovies(page:number=1){
    const params = new HttpParams().
    append('api_key',this.apiKey).
    append('page',page)
    return this.httpClient.get<GenresModel>(`${this.domain}movie/popular`,{params: params})
    // https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1

  }
}
 