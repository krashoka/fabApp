import { TestBed } from '@angular/core/testing';

import { AuthImplementsGuard } from './auth---implements.guard';

describe('AuthImplementsGuard', () => {
  let guard: AuthImplementsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthImplementsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
