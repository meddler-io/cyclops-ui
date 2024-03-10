import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementFindingBasicDetailsComponent } from './engagement-finding-basic-details.component';

describe('EngagementFindingBasicDetailsComponent', () => {
  let component: EngagementFindingBasicDetailsComponent;
  let fixture: ComponentFixture<EngagementFindingBasicDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementFindingBasicDetailsComponent]
    });
    fixture = TestBed.createComponent(EngagementFindingBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
