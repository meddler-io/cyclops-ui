import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildProgressViewComponent } from './build-progress-view.component';

describe('BuildProgressViewComponent', () => {
  let component: BuildProgressViewComponent;
  let fixture: ComponentFixture<BuildProgressViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildProgressViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildProgressViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
