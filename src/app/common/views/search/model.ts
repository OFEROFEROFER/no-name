export interface getMovieByTitleModel{
    page:number,
    results:{
      adult:boolean,
      title:string,
      vote_average:number,
      vote_count:number,
      overview:string,
      poster_path:string,
      id:number,
      release_date:string
    }[],
    total_pages:number,
    total_results:number,
  }

  export interface GetMovieInfoModel{
    poster_path:string,
    title:string,
    release_date:string,
    overview:string
    videos:{
      results:VideoResults[]
    }
    vote_average:number,
    vote_count:number,
  }

  export interface VideoResults{
    key:string,
    type:'Trailer'|'Featurette'|'Clip'
  }