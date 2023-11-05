import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaptFindingsComponent } from './vapt-findings.component';

describe('VaptFindingsComponent', () => {
  let component: VaptFindingsComponent;
  let fixture: ComponentFixture<VaptFindingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VaptFindingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VaptFindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
