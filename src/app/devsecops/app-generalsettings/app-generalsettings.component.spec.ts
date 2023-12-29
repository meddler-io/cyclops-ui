import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppGeneralsettingsComponent } from './app-generalsettings.component';

describe('AppGeneralsettingsComponent', () => {
  let component: AppGeneralsettingsComponent;
  let fixture: ComponentFixture<AppGeneralsettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppGeneralsettingsComponent]
    });
    fixture = TestBed.createComponent(AppGeneralsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
