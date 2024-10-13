import { AfterViewInit, Component, OnInit, Type, ViewChild, input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, debounceTime, filter, finalize, map, of, pairwise, skip, skipWhile, startWith, switchMap, tap, throttleTime } from 'rxjs';
import { MoviesApiService } from '../../../core/services/movies-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListItem, MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { getMovieByTitleModel } from './model';
import { ImagePipe } from "../../pipes/image.pipe";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FallbackDirective } from '../../directives/fallback.directive';
import { Router, RouterModule } from '@angular/router';
import { OriginalType, PersistentService } from '../../../core/services/persistent.service';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';
import { GenreItem, MoviesService } from '../../../core/services/movies.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import {PageEvent, MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { StarRatingComponent } from "../../components/star-rating/star-rating.component";



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatListItem,
    MatProgressSpinnerModule,
    CommonModule,
    ImagePipe,
    FallbackDirective,
    RouterModule,
    MatSelect,
    MatOption,
    MatIcon,
    MatPaginatorModule,
    StarRatingComponent
],
 
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit{
 
  @ViewChild('paginator') paginator: MatPaginator|undefined;

  form = new FormGroup({
    input: new FormControl(),
    genre: new FormControl(),
    page: new FormControl(),
  })


 
  page$!:BehaviorSubject<PageEvent>
  results$!:Observable<getMovieByTitleModel>
  genres$!:Observable<GenreItem[]>
  
  isLoading = false;
  hasError = false;
  
  constructor(
    private moviesApiService:MoviesApiService, 
    private router:Router,
    private persistentService:PersistentService,
    private genresService:MoviesService
  ){
   
  }
 
  


  ngOnInit(): void {
    const initialPrevValue = {genre:'',input:"",page:1} as unknown as  getMovieByTitleModel
    const initialNextValue = this.persistentService.getValue().search;
     
    this.form.setValue({genre:initialNextValue.genre??'',input:initialNextValue.input,page:initialNextValue.page}, { emitEvent: true });

    const emptyResult$ = of({page:0,total_pages:0,total_results:0,results:[]} as getMovieByTitleModel)
    const api$= (form:OriginalType):Observable<getMovieByTitleModel>=>this.moviesApiService.getMoviesByTitle(form.input,form.page) 

    
    const obs$ = (form:OriginalType):Observable<getMovieByTitleModel>=>{
    return  ((form.input.trim().length>0)?api$(form):emptyResult$).pipe(
      catchError(error=>{
        this.hasError = true;
        return emptyResult$
        }
      ),
      finalize(()=>this.isLoading = false))    
    }
    
    this.results$ = this.form.valueChanges.pipe(    
      throttleTime(300),  
       startWith( initialPrevValue,this.persistentService.getValue().search  ),
      // startWith( this.persistentService.getValue().search ),
      pairwise( ),  
      tap(([prev,next])=>{
        this.hasError = false;
        this.isLoading = true;        
        this.persistentService.setValue(next)
        
         
         
        if (this.paginator && ((prev.page??1) === (next.page??1) )) {          
          this.paginator.pageIndex = 0;
          next.page = 1
        }
    }),
  
 
    switchMap(([prev,next])=>obs$(next) ) ).pipe( 
      tap(res=>{
        console.log(res)
      }), 
      finalize(()=>{      
        this.isLoading = false
      }
    )
  )
 

    this.genres$ =this.genresService.getGenres() 
  } 
   

  handlePageEvent(page:PageEvent){

    
    this.form.patchValue({
      page: page.pageIndex+1
      
    });
  }
 }


 
 