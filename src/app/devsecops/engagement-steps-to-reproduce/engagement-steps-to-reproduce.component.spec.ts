import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementStepsToReproduceComponent } from './engagement-steps-to-reproduce.component';

describe('EngagementStepsToReproduceComponent', () => {
  let component: EngagementStepsToReproduceComponent;
  let fixture: ComponentFixture<EngagementStepsToReproduceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementStepsToReproduceComponent]
    });
    fixture = TestBed.createComponent(EngagementStepsToReproduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
