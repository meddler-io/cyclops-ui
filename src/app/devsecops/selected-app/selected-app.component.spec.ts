import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedAppComponent } from './selected-app.component';

describe('SelectedAppComponent', () => {
  let component: SelectedAppComponent;
  let fixture: ComponentFixture<SelectedAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
