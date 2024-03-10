import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementImpactStepComponent } from './engagement-impact-step.component';

describe('EngagementImpactStepComponent', () => {
  let component: EngagementImpactStepComponent;
  let fixture: ComponentFixture<EngagementImpactStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementImpactStepComponent]
    });
    fixture = TestBed.createComponent(EngagementImpactStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
