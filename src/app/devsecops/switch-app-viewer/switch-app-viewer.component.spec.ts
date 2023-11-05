import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchAppViewerComponent } from './switch-app-viewer.component';

describe('SwitchAppViewerComponent', () => {
  let component: SwitchAppViewerComponent;
  let fixture: ComponentFixture<SwitchAppViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchAppViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchAppViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
