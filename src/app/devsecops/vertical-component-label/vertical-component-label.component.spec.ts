import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalComponentLabelComponent } from './vertical-component-label.component';

describe('VerticalComponentLabelComponent', () => {
  let component: VerticalComponentLabelComponent;
  let fixture: ComponentFixture<VerticalComponentLabelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalComponentLabelComponent]
    });
    fixture = TestBed.createComponent(VerticalComponentLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
