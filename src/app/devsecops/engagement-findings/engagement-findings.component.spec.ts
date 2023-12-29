import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementFindingsComponent } from './engagement-findings.component';

describe('EngagementFindingsComponent', () => {
  let component: EngagementFindingsComponent;
  let fixture: ComponentFixture<EngagementFindingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementFindingsComponent]
    });
    fixture = TestBed.createComponent(EngagementFindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
