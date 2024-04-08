import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingsSettingsPopupComponent } from './findings-settings-popup.component';

describe('FindingsSettingsPopupComponent', () => {
  let component: FindingsSettingsPopupComponent;
  let fixture: ComponentFixture<FindingsSettingsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindingsSettingsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindingsSettingsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
