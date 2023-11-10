import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppsSidebarComponent } from './manage-apps-sidebar.component';

describe('ManageAppsSidebarComponent', () => {
  let component: ManageAppsSidebarComponent;
  let fixture: ComponentFixture<ManageAppsSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAppsSidebarComponent]
    });
    fixture = TestBed.createComponent(ManageAppsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
