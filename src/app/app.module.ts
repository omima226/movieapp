import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import MoviesComponent from './components/movies/movies.component';
import { TvShowComponent } from './components/tv-show/tv-show.component';
import { PeopleComponent } from './components/people/people.component';
import { AboutComponent } from './components/about/about.component';
import { NetworksComponent } from './components/networks/networks.component';
import { SearchPipe } from './search.pipe';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TvDetailsComponent } from './components/tv-details/tv-details.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ActorDetailsComponent } from './components/actor-details/actor-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    NotFoundComponent,
    MoviesComponent,
    TvShowComponent,
    PeopleComponent,
    AboutComponent,
    NetworksComponent,
    SearchPipe,
    MovieDetailsComponent,
    TvDetailsComponent,
    ActorDetailsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    ConfirmDialogModule,
    DialogModule,
    RatingModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
