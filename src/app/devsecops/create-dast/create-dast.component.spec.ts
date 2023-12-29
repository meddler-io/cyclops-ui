import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDastComponent } from './create-dast.component';

describe('CreateDastComponent', () => {
  let component: CreateDastComponent;
  let fixture: ComponentFixture<CreateDastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDastComponent]
    });
    fixture = TestBed.createComponent(CreateDastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
