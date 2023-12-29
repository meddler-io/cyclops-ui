import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementLayoutComponent } from './engagement-layout.component';

describe('EngagementLayoutComponent', () => {
  let component: EngagementLayoutComponent;
  let fixture: ComponentFixture<EngagementLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementLayoutComponent]
    });
    fixture = TestBed.createComponent(EngagementLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
