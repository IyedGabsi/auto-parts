import { TestBed } from '@angular/core/testing';

import { PieceTypeService } from './piece-type.service';

describe('PieceTypeService', () => {
  let service: PieceTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieceTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
