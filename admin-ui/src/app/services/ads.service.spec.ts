import { TestBed } from '@angular/core/testing';

import { AdsService } from './ads.service';

describe('AdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdsService = TestBed.get(AdsService);
    expect(service).toBeTruthy();
  });
});
