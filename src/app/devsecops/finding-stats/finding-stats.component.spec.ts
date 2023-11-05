import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingStatsComponent } from './finding-stats.component';

describe('FindingStatsComponent', () => {
  let component: FindingStatsComponent;
  let fixture: ComponentFixture<FindingStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindingStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
