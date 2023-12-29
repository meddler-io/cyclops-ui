import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APSelectorComponent } from './a-p-selector.component';

describe('APSelectorComponent', () => {
  let component: APSelectorComponent;
  let fixture: ComponentFixture<APSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [APSelectorComponent]
    });
    fixture = TestBed.createComponent(APSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
