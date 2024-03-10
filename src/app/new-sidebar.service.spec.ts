import { TestBed } from '@angular/core/testing';

import { NewSidebarService } from './new-sidebar.service';

describe('NewSidebarService', () => {
  let service: NewSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
