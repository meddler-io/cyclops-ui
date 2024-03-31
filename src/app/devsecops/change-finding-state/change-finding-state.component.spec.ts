import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeFindingStateComponent } from './change-finding-state.component';

describe('ChangeFindingStateComponent', () => {
  let component: ChangeFindingStateComponent;
  let fixture: ComponentFixture<ChangeFindingStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeFindingStateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeFindingStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
