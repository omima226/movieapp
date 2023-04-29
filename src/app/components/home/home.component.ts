import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _MoviesService:MoviesService , private _Router:Router){  }

  serchTerm:any;
  isLoading:boolean = false
  movies:any[] = []
  Tv:any[] = []
  person:any[] = []
  posterPath:string = 'https://image.tmdb.org/t/p/w500'

  ngOnInit(): void {

    const options1 = {
      strings: ['most watched movies by days'],
      typeSpeed: 100,
      backSpeed: 100,
      showCursor: true,
      cursorChar: '|',
      loop: true
    };
    const options2 = {
      strings: ['most watched series by days'],
      typeSpeed: 100,
      backSpeed: 100,
      showCursor: true,
      cursorChar: '|',
      loop: true
    };
    const options3 = {
      strings: ['most famous actors by days'],
      typeSpeed: 100,
      backSpeed: 100,
      showCursor: true,
      cursorChar: '|',
      loop: true
    };
    const typed1 = new Typed('.typed-element1', options1);
    const typed2 = new Typed('.typed-element2', options2);
    const typed3 = new Typed('.typed-element3', options3);


    this._MoviesService.searchTerm.subscribe({
      next: x => {
        this.serchTerm  = x
      }

    })
    this.serchTerm = ''
    this.isLoading = true
    this._MoviesService.getMovies('movie', 'day').subscribe({
      next:res =>{
        setTimeout(() => {
        // console.log(res);
        this.movies = res.results.slice(0,10)
        this.isLoading = false

        }, 1000);
      },
      error: err=>{
        console.log(err);
        this.isLoading = false

      }
    })
    this._MoviesService.getMovies('person' , 'day').subscribe({
      next:res =>{
        // console.log(res);
        this.person = res.results.slice(0 , 10)

      },
      error: err=>{
        console.log(err);
      }
    })
    this._MoviesService.getMovies('tv' , 'day').subscribe({
      next:res =>{
        // console.log(res);
        this.Tv = res.results.slice(0 , 10)

      },
      error: err=>{
        console.log(err);
        this.isLoading = false

      }
    })
  }


}
