import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticConfigComponent } from './static-config.component';

describe('StaticConfigComponent', () => {
  let component: StaticConfigComponent;
  let fixture: ComponentFixture<StaticConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
