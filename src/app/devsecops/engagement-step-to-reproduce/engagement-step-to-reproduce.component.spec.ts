import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementStepToReproduceComponent } from './engagement-step-to-reproduce.component';

describe('EngagementStepToReproduceComponent', () => {
  let component: EngagementStepToReproduceComponent;
  let fixture: ComponentFixture<EngagementStepToReproduceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementStepToReproduceComponent]
    });
    fixture = TestBed.createComponent(EngagementStepToReproduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
