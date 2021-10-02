import { Component, Input, OnInit } from '@angular/core';
import { ActorCompareService } from '../services/actor-compare.service';
import { Actor } from '../services/search.service';

@Component({
  selector: 'app-compare-display',
  templateUrl: './compare-display.component.html',
  styleUrls: ['./compare-display.component.css']
})
export class CompareDisplayComponent implements OnInit {

  actor1: Actor[];
  actor2: Actor[];

  @Input() set firstActorSet(value: Actor[]) {
    this.actor1 = value;
    this.updateIntersectingActors();
  }

  @Input() set secondActorSet(value: Actor[]) {
    this.actor2 = value;
    this.updateIntersectingActors();
  }

  intersectingActors: Actor[];

  constructor(private comparer: ActorCompareService) { }

  ngOnInit(): void {
  }

  updateIntersectingActors(): void {
    this.intersectingActors = this.comparer.getIntersectingActors(this.actor1, this.actor2);
  }
}
