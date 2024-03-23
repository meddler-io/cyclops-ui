import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEngagementStateComponent } from './manage-engagement-state.component';

describe('ManageEngagementStateComponent', () => {
  let component: ManageEngagementStateComponent;
  let fixture: ComponentFixture<ManageEngagementStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEngagementStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageEngagementStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
