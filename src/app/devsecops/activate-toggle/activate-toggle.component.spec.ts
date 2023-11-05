import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateToggleComponent } from './activate-toggle.component';

describe('ActivateToggleComponent', () => {
  let component: ActivateToggleComponent;
  let fixture: ComponentFixture<ActivateToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
