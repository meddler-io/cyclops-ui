import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildDetailViewComponent } from './build-detail-view.component';

describe('BuildDetailViewComponent', () => {
  let component: BuildDetailViewComponent;
  let fixture: ComponentFixture<BuildDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
