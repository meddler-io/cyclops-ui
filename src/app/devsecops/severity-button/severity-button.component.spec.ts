import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverityButtonComponent } from './severity-button.component';

describe('SeverityButtonComponent', () => {
  let component: SeverityButtonComponent;
  let fixture: ComponentFixture<SeverityButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeverityButtonComponent]
    });
    fixture = TestBed.createComponent(SeverityButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
