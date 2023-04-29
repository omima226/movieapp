import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import MoviesComponent from './components/movies/movies.component';
import { TvShowComponent } from './components/tv-show/tv-show.component';
import { PeopleComponent } from './components/people/people.component';
import { AboutComponent } from './components/about/about.component';
import { NetworksComponent } from './components/networks/networks.component';
import { AuthGuard } from './guards/auth.guard';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { TvDetailsComponent } from './components/tv-details/tv-details.component';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';

const routes: Routes = [
  {path:'' , redirectTo:'home' , pathMatch:'full' },
  {path:'home', title:'home' , canActivate : [AuthGuard], component:HomeComponent},
  {path:'movies' , title:'movies' , canActivate : [AuthGuard] , component:MoviesComponent},
  {path:'tv' , title:'TV' , component:TvShowComponent , canActivate : [AuthGuard]},
  {path:'people' , title:'people' , component:PeopleComponent , canActivate : [AuthGuard]},
  {path:'about' ,title:'about' , component:AboutComponent , canActivate : [AuthGuard]},
  {path:'network' , title:'network' , component:NetworksComponent , canActivate : [AuthGuard]},
  {path:'movieDetails/:id/:media' , title:' Movie Details', component:MovieDetailsComponent , canActivate : [AuthGuard]},
  {path:'tvDetails/:id/:media' , title:' TV Details', component:TvDetailsComponent , canActivate : [AuthGuard]},
  {path:'actorDetails/:id/:media' , title:'Actor Details', component:ActorDetailsComponent , canActivate : [AuthGuard]},
  {path:'login' , component:LoginComponent, title:'login'},
  {path:'register' , component:RegisterComponent , title:'register'},
  {path:'**' ,   component:NotFoundComponent , title:'NOT FOUND'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
