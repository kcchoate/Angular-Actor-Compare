import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieActor, Movie, SearchService } from '../services/search.service';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent implements OnInit, OnDestroy {

  movieField: Movie;
  @Input() set movie(value: Movie) {
    this.movieField = value;
    this.updateActors(value.id);
  }

  @Output() actorsFound: EventEmitter<MovieActor[]> = new EventEmitter<MovieActor[]>();

  actors: MovieActor[];
  pastSubs: Subscription[] = [];

  constructor(private search: SearchService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.pastSubs.forEach(x => x.unsubscribe());
  }

  updateActors(movieId: number): void {
    this.pastSubs.push(this.search.getMoviesActors(movieId).subscribe(x => {
      this.actors = x;
      this.actorsFound.emit(this.actors);
    }));
  }

}
