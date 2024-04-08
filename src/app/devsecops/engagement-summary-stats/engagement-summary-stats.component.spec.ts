import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementSummaryStatsComponent } from './engagement-summary-stats.component';

describe('EngagementSummaryStatsComponent', () => {
  let component: EngagementSummaryStatsComponent;
  let fixture: ComponentFixture<EngagementSummaryStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EngagementSummaryStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EngagementSummaryStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
