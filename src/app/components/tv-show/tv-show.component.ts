import { Component } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.css']
})
export class TvShowComponent {

  constructor(private _MoviesService:MoviesService){ }
  isLoading:boolean = true
  movies!:any[]
  posterPath:string = 'https://image.tmdb.org/t/p/w500'

  ngOnInit(): void {
    this._MoviesService.getMovies('tv', 'week').subscribe({
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
