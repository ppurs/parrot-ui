import { TestBed } from '@angular/core/testing';

import { AppGuard } from './app-guard.service';

describe('AppGuard', () => {
  let service: AppGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
