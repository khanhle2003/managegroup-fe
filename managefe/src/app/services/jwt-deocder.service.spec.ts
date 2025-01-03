import { TestBed } from '@angular/core/testing';

import { JwtDeocderService } from './jwt-deocder.service';

describe('JwtDeocderService', () => {
  let service: JwtDeocderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtDeocderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
