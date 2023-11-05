import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickScanJobsComponent } from './quick-scan-jobs.component';

describe('QuickScanJobsComponent', () => {
  let component: QuickScanJobsComponent;
  let fixture: ComponentFixture<QuickScanJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickScanJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickScanJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
