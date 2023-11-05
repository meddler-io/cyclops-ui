import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntUnintAppsComponent } from './int-unint-apps.component';

describe('IntUnintAppsComponent', () => {
  let component: IntUnintAppsComponent;
  let fixture: ComponentFixture<IntUnintAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntUnintAppsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntUnintAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
