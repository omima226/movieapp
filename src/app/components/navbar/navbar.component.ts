import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { ActivatedRoute, Router , NavigationEnd} from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit   {
  constructor(private _AuthService:AuthService , private _MoviesService:MoviesService , private _Router:Router ,  private _Location:Location){

  }

  currentRoute!: any;
  searchTerm:any = '';
  isLogin:boolean = false

  ngOnInit(): void {
      this._Router.events.subscribe(
        val=>{
          if(this._Location.path() != ''){
            this.currentRoute = this._Location.path().split('').splice(1).join('')
          }
        }
      )

    this._AuthService.userData.subscribe({
      next : (x:any) =>{
        if (x !== null)
        {
          this.isLogin = true
        }
        else
        {
          this.isLogin = false
        }
      }
    })
  }

  search(){
    this._MoviesService.searchTerm.next(this.searchTerm)
  }

  logout(){
    this._AuthService.logout()
  }

}
