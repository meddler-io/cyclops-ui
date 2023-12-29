import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAppDetailSidebarComponent } from './manage-app-detail-sidebar.component';

describe('ManageAppDetailSidebarComponent', () => {
  let component: ManageAppDetailSidebarComponent;
  let fixture: ComponentFixture<ManageAppDetailSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAppDetailSidebarComponent]
    });
    fixture = TestBed.createComponent(ManageAppDetailSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
