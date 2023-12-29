import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSastComponent } from './create-sast.component';

describe('CreateSastComponent', () => {
  let component: CreateSastComponent;
  let fixture: ComponentFixture<CreateSastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSastComponent]
    });
    fixture = TestBed.createComponent(CreateSastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
