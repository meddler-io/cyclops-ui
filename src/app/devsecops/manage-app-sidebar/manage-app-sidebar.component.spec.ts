import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppSidebarComponent } from './manage-app-sidebar.component';

describe('ManageAppSidebarComponent', () => {
  let component: ManageAppSidebarComponent;
  let fixture: ComponentFixture<ManageAppSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAppSidebarComponent]
    });
    fixture = TestBed.createComponent(ManageAppSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
