import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {HotTableModule} from '@handsontable/angular';
import {AppComponent} from './app.component';
import {MoviesComponent} from './components/movies/movies.component';
import {AddMovieComponent} from './components/add-movie/add-movie.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path: '', component: MoviesComponent},
];

@NgModule({
  declarations: [AppComponent, MoviesComponent, AddMovieComponent],
  imports: [BrowserModule, HttpClientModule, HotTableModule, RouterModule.forRoot(routes), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
