import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProtectionComponent } from './active-protection.component';

describe('ActiveProtectionComponent', () => {
  let component: ActiveProtectionComponent;
  let fixture: ComponentFixture<ActiveProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveProtectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
