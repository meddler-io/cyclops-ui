import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickScanJobsAdminComponent } from './quick-scan-jobs-admin.component';

describe('QuickScanJobsAdminComponent', () => {
  let component: QuickScanJobsAdminComponent;
  let fixture: ComponentFixture<QuickScanJobsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickScanJobsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickScanJobsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
