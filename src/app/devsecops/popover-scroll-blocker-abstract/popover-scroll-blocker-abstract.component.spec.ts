import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverScrollBlockerAbstractComponent } from './popover-scroll-blocker-abstract.component';

describe('PopoverScrollBlockerAbstractComponent', () => {
  let component: PopoverScrollBlockerAbstractComponent;
  let fixture: ComponentFixture<PopoverScrollBlockerAbstractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverScrollBlockerAbstractComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopoverScrollBlockerAbstractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
