import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie } from '../../models/movie';
import { MoviesService } from './../../services/movies.service';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;

  constructor(private moviesService: MoviesService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({genreId}) => {
      if(genreId){
        this.genreId = genreId;
        this.getMovieByGenre(genreId,1)
      }else {
        this.getPagedMovies(1);
      }
    })
  }

  getPagedMovies(page:number) {
    this.moviesService.searchMovies(page).subscribe(res => {
      this.movies = res
    })
  }

  getMovieByGenre(genreId: string, pageNumber: number){
    this.moviesService.getMoviesByGenre(genreId, pageNumber).subscribe(movie => {
      this.movies = movie
    })
  }

  paginate(event: any){
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMovieByGenre(this.genreId, pageNumber)
    } else {
      this.getPagedMovies(pageNumber)
    }
  }

}
