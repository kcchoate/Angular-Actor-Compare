import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieActor, SearchService, TvShow, TvShowActor } from '../services/search.service';

@Component({
  selector: 'app-tvshow-display',
  templateUrl: './tvshow-display.component.html',
  styleUrls: ['./tvshow-display.component.css']
})
export class TvshowDisplayComponent implements OnInit, OnDestroy {

  tvshowField: TvShow;
  @Input() set tvShow(value: TvShow) {
    this.tvshowField = value;
    this.updateActors(value.id);
  }

  @Output() actorsFound: EventEmitter<TvShowActor[]> = new EventEmitter<TvShowActor[]>();

  actors: TvShowActor[];
  pastSubs: Subscription[] = [];

  constructor(private search: SearchService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.pastSubs.forEach(x => x.unsubscribe());
  }

  updateActors(tvShowId: number): void {
    this.pastSubs.push(this.search.getTvShowActors(tvShowId).subscribe(x => {
      this.actors = x;
      this.actorsFound.emit(this.actors);
    }));
  }

}
