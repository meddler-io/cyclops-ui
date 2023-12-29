import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementAssignToComponent } from './engagement-assign-to.component';

describe('EngagementAssignToComponent', () => {
  let component: EngagementAssignToComponent;
  let fixture: ComponentFixture<EngagementAssignToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementAssignToComponent]
    });
    fixture = TestBed.createComponent(EngagementAssignToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
