import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Movie} from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://test-movies-api.vercel.app/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(limit: number = 100, page: number = 0): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl + '?limit=' + limit + '&page=' + page);
  }

  createMovie(movie: any): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie);
  }

  updateMovie(movie: any): Observable<Movie> {
    return this.http.put<Movie>(this.apiUrl + '/' + movie.id, movie);
  }

  deleteMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(this.apiUrl + '/' + id);
  }
}
