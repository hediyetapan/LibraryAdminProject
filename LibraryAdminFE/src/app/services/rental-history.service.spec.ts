import { TestBed } from '@angular/core/testing';

import { RentalHistoryService } from './rental-history.service';

describe('RentalHistoryService', () => {
  let service: RentalHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
