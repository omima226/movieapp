import { ActivatedRoute } from '@angular/router';
import { Component} from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actor-details',
  templateUrl: './actor-details.component.html',
  styleUrls: ['./actor-details.component.css']
})
export class ActorDetailsComponent {

  constructor(private _ActivatedRoute:ActivatedRoute , private _MoviesService:MoviesService){ }

  formGroup!: FormGroup;
  id:any = ''
  media:any = ''
  movieDetails:any = {}
  isLoading:boolean = false
  posterPath:string = 'https://image.tmdb.org/t/p/w500'
  similiarMovies:any[] = []
  bgLayer = ''

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      value: new FormControl(0)
      });
    this.isLoading = true
    this._ActivatedRoute.paramMap.subscribe({
      next :  params => {
        this.id = params.get('id')
        this.media = params.get('media')

        this._MoviesService.getSpecificDtails(this.media , this.id).subscribe({
          next: res=>{
          setTimeout(() => {
            console.log(res);
            this.bgLayer = `url(${this.posterPath + res.profile_path})`
            this.movieDetails = res
            this.isLoading = false

          }, 1000);}
        })


      }
    })
    this._MoviesService.getSimilar( this.media , this.id ).subscribe({
      next: res=>{
        this.similiarMovies = res.results
      }
    })
  }



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

}
