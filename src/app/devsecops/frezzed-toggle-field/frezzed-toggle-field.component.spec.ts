import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrezzedToggleFieldComponent } from './frezzed-toggle-field.component';

describe('FrezzedToggleFieldComponent', () => {
  let component: FrezzedToggleFieldComponent;
  let fixture: ComponentFixture<FrezzedToggleFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrezzedToggleFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrezzedToggleFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
