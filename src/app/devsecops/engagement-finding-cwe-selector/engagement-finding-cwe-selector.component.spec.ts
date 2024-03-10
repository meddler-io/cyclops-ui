import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementFindingCweSelectorComponent } from './engagement-finding-cwe-selector.component';

describe('EngagementFindingCweSelectorComponent', () => {
  let component: EngagementFindingCweSelectorComponent;
  let fixture: ComponentFixture<EngagementFindingCweSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementFindingCweSelectorComponent]
    });
    fixture = TestBed.createComponent(EngagementFindingCweSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
