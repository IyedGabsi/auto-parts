import { TestBed } from '@angular/core/testing';

import { MarquesDataService } from './marques-data.service';

describe('MarquesDataService', () => {
  let service: MarquesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarquesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
