import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBriefDetailsComponent } from './app-brief-details.component';

describe('AppBriefDetailsComponent', () => {
  let component: AppBriefDetailsComponent;
  let fixture: ComponentFixture<AppBriefDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppBriefDetailsComponent]
    });
    fixture = TestBed.createComponent(AppBriefDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
