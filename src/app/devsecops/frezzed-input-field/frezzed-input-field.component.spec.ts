import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrezzedInputFieldComponent } from './frezzed-input-field.component';

describe('FrezzedInputFieldComponent', () => {
  let component: FrezzedInputFieldComponent;
  let fixture: ComponentFixture<FrezzedInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrezzedInputFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrezzedInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
