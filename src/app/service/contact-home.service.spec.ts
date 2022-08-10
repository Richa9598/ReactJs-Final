import { TestBed } from '@angular/core/testing';

import { ContactHomeService } from './contact-home.service';

describe('ContactHomeService', () => {
  let service: ContactHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
