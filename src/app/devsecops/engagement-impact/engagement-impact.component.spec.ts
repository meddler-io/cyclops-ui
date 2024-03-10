import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementImpactComponent } from './engagement-impact.component';

describe('EngagementImpactComponent', () => {
  let component: EngagementImpactComponent;
  let fixture: ComponentFixture<EngagementImpactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementImpactComponent]
    });
    fixture = TestBed.createComponent(EngagementImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
