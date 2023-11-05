import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingDetailViewComponent } from './finding-detail-view.component';

describe('FindingDetailViewComponent', () => {
  let component: FindingDetailViewComponent;
  let fixture: ComponentFixture<FindingDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindingDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
