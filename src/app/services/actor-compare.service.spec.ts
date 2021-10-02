import { TestBed } from '@angular/core/testing';

import { ActorCompareService } from './actor-compare.service';

describe('ActorCompareService', () => {
  let service: ActorCompareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActorCompareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
