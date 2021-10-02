import { Component, OnInit } from '@angular/core';
import { MovieActor } from '../services/search.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {
  firstActorSet: MovieActor[];
  secondActorSet: MovieActor[];
  constructor() { }

  ngOnInit(): void {
  }

  updateActorSet(set: number, actors: MovieActor[]): void {
    if (set === 1) {
      this.firstActorSet = actors;
    } else {
      this.secondActorSet = actors;
    }
  }
}
