import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsSummaryBarChartComponent } from './findings-summary-bar-chart.component';

describe('FindingsSummaryBarChartComponent', () => {
  let component: FindingsSummaryBarChartComponent;
  let fixture: ComponentFixture<FindingsSummaryBarChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindingsSummaryBarChartComponent]
    });
    fixture = TestBed.createComponent(FindingsSummaryBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
