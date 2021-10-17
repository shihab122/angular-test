import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../services/movie.service';
import {Movie} from '../../models/Movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  dataset: any[] = [];
  columnsWidth = [90, 450, 750, 180, 200, 165];
  columnsHeader = ['ID', 'Title', 'Original Title', 'Status', 'Budget', 'Popularity'];
  columns = [
    {
      data: 'id'
    }, {
      data: 'title'
    }, {
      data: 'originalTitle'
    }, {
      data: 'status'
    }, {
      data: 'budget'
    }, {
      data: 'popularity'
    }
  ];

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getMovies();
  }

  addMovie(movie: Movie): void {
    this.createMovie(movie);
  }

  afterChange = (changes, src) => {
    if (src === 'edit' && changes[0][1] === 'id' && !changes[0][3]) {
      this.deleteMovie(changes[0][2]);
    }
    else if (src === 'edit') {
      const existingMovie = this.dataset[changes[0][0]];
      existingMovie[changes[0][1]] = changes[0][3];
      this.updateMovie(existingMovie);
    }
  }

  afterColumnResize(newSize: number, column: number): any {
    if (localStorage.getItem('columnsWidth')) {
      const columnsWidth = JSON.parse(localStorage.getItem('columnsWidth'));
      columnsWidth[column] = newSize;
      localStorage.setItem('columnsWidth', JSON.stringify(columnsWidth));
    }
  }

  columnMove(movedColumns: number[], finalIndex: number): any {
    if (localStorage.getItem('columnsWidth')) {
      const columnsWidth = JSON.parse(localStorage.getItem('columnsWidth'));
      [columnsWidth[movedColumns[0]], columnsWidth[finalIndex]] = [columnsWidth[finalIndex], columnsWidth[movedColumns[0]]];
      localStorage.setItem('columnsWidth', JSON.stringify(columnsWidth));
    }
    if (localStorage.getItem('columns')) {
      const columns = JSON.parse(localStorage.getItem('columns'));
      [columns[movedColumns[0]], columns[finalIndex]] = [columns[finalIndex], columns[movedColumns[0]]];
      localStorage.setItem('columns', JSON.stringify(columns));
    }
    if (localStorage.getItem('columnsHeader')) {
      const columns = JSON.parse(localStorage.getItem('columnsHeader'));
      [columns[movedColumns[0]], columns[finalIndex]] = [columns[finalIndex], columns[movedColumns[0]]];
      localStorage.setItem('columnsHeader', JSON.stringify(columns));
    }
  }

  getColumns(): any {
    return this.getOrSetLocalStorageValue('columns', this.columns);
  }

  getColumnsHeader(): any {
    return this.getOrSetLocalStorageValue('columnsHeader', this.columnsHeader);
  }

  getColumnsWidth(): any {
    return this.getOrSetLocalStorageValue('columnsWidth', this.columnsWidth);
  }

  getOrSetLocalStorageValue(key: string, value: any): any {
    if (!localStorage.getItem(key)) {
      return localStorage.setItem(key, JSON.stringify(value));
    } else {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  getMovies(): any {
    this.movieService.getMovies().subscribe(data => {
      this.dataset = data;
    }, error => {
      alert(error.message);
    });
  }

  createMovie(movie: any): any {
    this.movieService.createMovie(movie).subscribe(data => {
      alert('Successfully Created');
      this.dataset.push(data);
    }, error => {
      alert(error.message);
    });
  }

  updateMovie(movie: any): any {
    this.movieService.updateMovie(movie).subscribe(() => {
      alert('Successfully Updated');
    }, error => {
      alert(error.message);
    });
  }

  deleteMovie(id: any): any {
    this.movieService.deleteMovie(id).subscribe(() => {
      alert('Successfully Deleted');
    }, error => {
      alert(error.message);
    });
  }
}
