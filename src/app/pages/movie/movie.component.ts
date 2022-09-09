import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { IMAGES_SIZES } from './../../constant/images-sizes';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {

  movie: Movie | null = null;
  readonly imagesSizes = IMAGES_SIZES ;
  movieVideos: MovieVideo[] = [] ;
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  similiarMovie: Movie | null = null;

  constructor(private route: ActivatedRoute, private movieService: MoviesService) { }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({id}) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    })
  }

  ngOnDestroy() {
   console.log('component destroyed');
   
  }

  getMovie(id: string) {  
    this.movieService.getMovie(id).subscribe((movieData) => {
      this.movie = movieData;
      console.log("movieData "+movieData);
      
    })
  }

  getMovieVideos(id:string ){
    this.movieService.getMovieVideo(id).subscribe((movieVideoData) => {
      this.movieVideos = movieVideoData;
      console.log("movieVideoData " + movieVideoData);
    })
  }

  getMovieImages(id: string){
   this.movieService.getMovieImages(id).subscribe((movieImagesData) => {
    this.movieImages = movieImagesData;
   })
  }

  getMovieCredits(id: string){
    this.movieService.getMovieCredits(id).subscribe((movieCreditsData)=>{
      this.movieCredits = movieCreditsData;
    })
  }

  getSimiliarMovie(id:string){
    this.movieService.getSimiliarMovie(id).subscribe((similiarMovieData) =>{
      this.similiarMovie = similiarMovieData;
    })
  }

  identify(index:number, item:MovieVideo){
    return item.key;
  }
}
