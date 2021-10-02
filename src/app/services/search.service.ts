import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly searchRoot = 'https://moviecompare.azurewebsites.net/api';
  // private readonly searchRoot = 'https://localhost:44347/api';

  constructor(private http: HttpClient) { }

  search(searchTerm: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(this.searchRoot + '/search/' + searchTerm).pipe(
      map(x => {
        return {
          movies: x.movies.map(y =>
          ({id: y.id,
            title: y.title,
            posterPath: y.posterPath,
            overview: y.overview,
            releaseDate: new Date(y.releaseDate),
            type: 'movie'})),
          tvShows: x.tvShows.map(y =>
            ({id: y.id,
              title: y.title,
              posterPath: y.posterPath,
              overview: y.overview,
              releaseDate: new Date(y.releaseDate),
              type: 'tvshow'})) };
      })
    );
  }
  getTvShowActors(tvShowId: number): Observable<TvShowActor[]> {
    return this.http.get<TvShowActor[]>(this.searchRoot + '/tvshows/' + tvShowId + '/actors').pipe(
      map(x => {
        return x.map(y =>
          ({
            actorId: y.actorId,
            profilePath: y.profilePath,
            characterName: y.characterName,
            name: y.name,
            url: y.url,
            type: 'tvshow'
          }));
      })
    );
  }

  getMoviesActors(movieId: number): Observable<MovieActor[]> {
    return this.http.get<MovieActor[]>(this.searchRoot + '/movies/' + movieId + '/actors').pipe(
      map(x => {
        return x.map(y =>
          ({
            actorId: y.actorId,
            profilePath: y.profilePath,
            characterName: y.characterName,
            name: y.name,
            type: 'movie'
          }));
      })
    );
  }

  getMovieActorsUrl(actorId: number): Observable<string> {
    return this.http.get<string>(this.searchRoot + '/movies/actors/' + actorId + '/imdbUrl');
  }
}

export interface SearchResult {
  movies: Movie[];
  tvShows: TvShow[];
}

export interface TvShow {
  id: number;
  title: string;
  posterPath: string;
  overview: string;
  releaseDate: Date;
  type: 'tvshow';
}

export interface Movie {
  id: number;
  title: string;
  posterPath: string;
  overview: string;
  releaseDate: Date;
  type: 'movie';
}

export interface Actor {
  actorId: number;
  profilePath: string;
  characterName: string;
  name: string;
  type: 'movie' | 'tvshow';
}

export interface MovieActor extends Actor {
  type: 'movie';
}


export interface TvShowActor extends Actor {
  type: 'tvshow';
  url: string;
}
