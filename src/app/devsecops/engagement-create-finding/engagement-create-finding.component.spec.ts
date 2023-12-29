import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementCreateFindingComponent } from './engagement-create-finding.component';

describe('EngagementCreateFindingComponent', () => {
  let component: EngagementCreateFindingComponent;
  let fixture: ComponentFixture<EngagementCreateFindingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementCreateFindingComponent]
    });
    fixture = TestBed.createComponent(EngagementCreateFindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
