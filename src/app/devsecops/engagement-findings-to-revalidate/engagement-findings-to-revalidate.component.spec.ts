import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementFindingsToRevalidateComponent } from './engagement-findings-to-revalidate.component';

describe('EngagementFindingsToRevalidateComponent', () => {
  let component: EngagementFindingsToRevalidateComponent;
  let fixture: ComponentFixture<EngagementFindingsToRevalidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementFindingsToRevalidateComponent]
    });
    fixture = TestBed.createComponent(EngagementFindingsToRevalidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
