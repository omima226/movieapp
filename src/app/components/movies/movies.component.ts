import { Component, OnInit, OnChanges , AfterContentInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export default class MoviesComponent   {

  constructor(private _MoviesService:MoviesService){ }
  isLoading:boolean = false
  movies!:any[]
  posterPath:string = 'https://image.tmdb.org/t/p/w500'
  serchTerm!:string
  ngOnInit(): void {
    this.isLoading = true
    this._MoviesService.searchTerm.subscribe({
      next: x => {
        this.serchTerm  = x
      }

    })
    this.serchTerm = ''
    this._MoviesService.getMovies('movie', 'week').subscribe({
      next:res =>{
        setTimeout(() => {

        console.log(res);
        this.movies = res.results
        this.isLoading = false

        }, 1000);
      },
      error: err=>{
        console.log(err);
        this.isLoading = false

      }
    })

  }
}
