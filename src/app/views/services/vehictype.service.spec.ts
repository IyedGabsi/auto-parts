import { TestBed } from '@angular/core/testing';

import { VehictypeService } from './vehictype.service';

describe('VehictypeService', () => {
  let service: VehictypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehictypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
