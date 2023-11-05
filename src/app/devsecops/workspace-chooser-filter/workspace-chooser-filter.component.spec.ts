import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceChooserFilterComponent } from './workspace-chooser-filter.component';

describe('WorkspaceChooserFilterComponent', () => {
  let component: WorkspaceChooserFilterComponent;
  let fixture: ComponentFixture<WorkspaceChooserFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceChooserFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceChooserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
