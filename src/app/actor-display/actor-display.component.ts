import { Component, Input, OnInit } from '@angular/core';
import { Actor, SearchService, TvShowActor } from '../services/search.service';

@Component({
  selector: 'app-actor-display',
  templateUrl: './actor-display.component.html',
  styleUrls: ['./actor-display.component.css']
})
export class ActorDisplayComponent implements OnInit {

  @Input() actor: Actor;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  openActor(): void {
    if ((this.actor as TvShowActor)?.url) {
      window.open((this.actor as TvShowActor).url, '_blank');
    } else {
      const sub = this.searchService.getMovieActorsUrl(this.actor.actorId).subscribe((x: string) => {
        if (x) {
          window.open(x, '_blank');
        }
      });

    }

  }
}
