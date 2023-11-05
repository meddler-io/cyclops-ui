import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppListSelectorComponent } from './app-list-selector.component';

describe('AppListSelectorComponent', () => {
  let component: AppListSelectorComponent;
  let fixture: ComponentFixture<AppListSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppListSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppListSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
