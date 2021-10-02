import { Injectable } from '@angular/core';
import { Actor } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class ActorCompareService {

  constructor() { }

  getIntersectingActors(firstActorSet: Actor[], secondActorSet: Actor[]): Actor[] {
    if (firstActorSet?.length && secondActorSet?.length) {
      if (firstActorSet[0].type === secondActorSet[0].type) {
        return firstActorSet.filter(x => secondActorSet.some(y => y.actorId === x.actorId))
        .map(x => {
          const match = secondActorSet.find(y => y.actorId === x.actorId);
          const characterName = x.characterName === match.characterName ? x.characterName : `${x.characterName} and ${match.characterName}`;
          return ({actorId: x.actorId,
            profilePath: x.profilePath,
            characterName,
            name: x.name,
            type: x.type});
        });
      } else {
        return firstActorSet.filter(x => secondActorSet.some(y => y.name.toLowerCase() === x.name.toLowerCase()))
        .map(x => {
          const match = secondActorSet.find(y => y.name.toLowerCase() === x.name.toLowerCase());
          const characterName = x.characterName === match.characterName ? x.characterName : `${x.characterName} and ${match.characterName}`;
          return ({actorId: x.actorId,
            profilePath: x.profilePath,
            characterName,
            name: x.name,
            type: x.type});
        });
      }
    }
    else {
      return [];
    }
  }
}
