import { TestBed } from '@angular/core/testing';

import { SitesForDestService } from './sites-for-dest.service';

describe('SitesForDestService', () => {
  let service: SitesForDestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitesForDestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
