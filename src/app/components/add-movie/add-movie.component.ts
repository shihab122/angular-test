import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Movie} from '../../models/Movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  @Output() onAddMovie: EventEmitter<Movie> = new EventEmitter();
  title: string;
  originalTitle: string;
  budget = 0;

  constructor() {
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.title) {
      alert('Please add a title!');
      return;
    }

    const newMovie = {
      title: this.title,
      originalTitle: this.originalTitle,
      budget: this.budget + ''
    };

    this.onAddMovie.emit(newMovie);

    this.title = '';
    this.originalTitle = '';
    this.budget = 0;
  }

}
