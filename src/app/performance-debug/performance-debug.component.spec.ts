import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceDebugComponent } from './performance-debug.component';

describe('PerformanceDebugComponent', () => {
  let component: PerformanceDebugComponent;
  let fixture: ComponentFixture<PerformanceDebugComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerformanceDebugComponent]
    });
    fixture = TestBed.createComponent(PerformanceDebugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
