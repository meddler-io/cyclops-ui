import { TestBed } from '@angular/core/testing';

import { BranchValidatorService } from './branch-validator.service';

describe('BranchValidatorService', () => {
  let service: BranchValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
