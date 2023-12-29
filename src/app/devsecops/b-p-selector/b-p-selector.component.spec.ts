import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BPSelectorComponent } from './b-p-selector.component';

describe('BPSelectorComponent', () => {
  let component: BPSelectorComponent;
  let fixture: ComponentFixture<BPSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BPSelectorComponent]
    });
    fixture = TestBed.createComponent(BPSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
