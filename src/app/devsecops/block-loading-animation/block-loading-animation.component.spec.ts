import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockLoadingAnimationComponent } from './block-loading-animation.component';

describe('BlockLoadingAnimationComponent', () => {
  let component: BlockLoadingAnimationComponent;
  let fixture: ComponentFixture<BlockLoadingAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockLoadingAnimationComponent]
    });
    fixture = TestBed.createComponent(BlockLoadingAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
