import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildLoadingAnimationComponent } from './build-loading-animation.component';

describe('BuildLoadingAnimationComponent', () => {
  let component: BuildLoadingAnimationComponent;
  let fixture: ComponentFixture<BuildLoadingAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildLoadingAnimationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildLoadingAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
