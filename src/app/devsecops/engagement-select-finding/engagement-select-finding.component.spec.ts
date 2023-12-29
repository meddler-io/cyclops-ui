import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementSelectFindingComponent } from './engagement-select-finding.component';

describe('EngagementSelectFindingComponent', () => {
  let component: EngagementSelectFindingComponent;
  let fixture: ComponentFixture<EngagementSelectFindingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementSelectFindingComponent]
    });
    fixture = TestBed.createComponent(EngagementSelectFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
