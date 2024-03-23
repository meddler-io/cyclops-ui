import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementFindingSeverityComponent } from './engagement-finding-severity.component';

describe('EngagementFindingSeverityComponent', () => {
  let component: EngagementFindingSeverityComponent;
  let fixture: ComponentFixture<EngagementFindingSeverityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementFindingSeverityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EngagementFindingSeverityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
