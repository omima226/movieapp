import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient:HttpClient) { }

  searchTerm = new BehaviorSubject('null')

  apiKey:string = 'a838f9e3b0cc79abce5221b216e1f5ef';

  getMovies(type:string , time:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/trending/${type}/${time}?api_key=${this.apiKey}`)
  }
  getActor():Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/person/popular?api_key=${this.apiKey}language=en-US&page=1`)
  }
  getTv():Observable<any>
  {
    return this._HttpClient.get(` https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1`)
  }
  getSpecificDtails(type:string , id:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${this.apiKey}&language=en-US`)
  }
  getSimilar(type:string , id:string):Observable<any>
  {
    return this._HttpClient.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${this.apiKey}&language=en-US&page=1`)
  }
}
