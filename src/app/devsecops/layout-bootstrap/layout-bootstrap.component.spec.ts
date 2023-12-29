import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBootstrapComponent } from './layout-bootstrap.component';

describe('LayoutBootstrapComponent', () => {
  let component: LayoutBootstrapComponent;
  let fixture: ComponentFixture<LayoutBootstrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutBootstrapComponent]
    });
    fixture = TestBed.createComponent(LayoutBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
