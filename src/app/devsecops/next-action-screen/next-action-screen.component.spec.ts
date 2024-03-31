import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextActionScreenComponent } from './next-action-screen.component';

describe('NextActionScreenComponent', () => {
  let component: NextActionScreenComponent;
  let fixture: ComponentFixture<NextActionScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextActionScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextActionScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
