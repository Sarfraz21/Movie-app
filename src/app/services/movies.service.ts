import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Movie, MovieCredits, MovieImages, MoviesDto, MovievideoDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TvDto } from '../models/tvs';
import { GenresDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '7a9e252d7ed3020f6f72fe6c74b92ecf';


  constructor(private http: HttpClient) { }

  getMovies(type: string = 'upcoming',count: number = 12) {
    return this.http.get<MoviesDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`)
    .pipe(switchMap(res => {
      return of(res.results.slice(0,count));
    }));
  }

  getMovie(id: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`)
  }

  getMovieVideo(id: string) {
    return this.http.get<MovievideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`)
    .pipe(switchMap((res) => { 
      return of(res.results);
    }));
  }

  searchMovies(page: number) {
    return this.http.get<MoviesDto>(`${this.baseUrl}/movie/popular?page=${page}&api_key=${this.apiKey}`)
    .pipe(switchMap((res)=>{
      return of(res.results);
    }))
  }

  getMovieGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`)
      .pipe(switchMap((res) => {
        return of(res.genres);
      }));
  }

  getMoviesByGenre(genreId: string, pageNumber: number) {
    return this.http.get<MoviesDto>(`${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${pageNumber}&api_key=${this.apiKey}`)
      .pipe(switchMap(res => {
        return of(res.results);
      }));
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`)
  }

  getMovieCredits(id: string){
    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`)
  }

  getSimiliarMovie(id:string){
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}/similar?api_key=${this.apiKey}`)
  }

  getTvs(type: string = 'latest', count: number = 12) {
    return this.http.get<TvDto>(`${this.baseUrl}/tv/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }


}
// https://api.themoviedb.org/3/tv/top_rated?api_key=7a9e252d7ed3020f6f72fe6c74b92ecf&language=en-US&page=1