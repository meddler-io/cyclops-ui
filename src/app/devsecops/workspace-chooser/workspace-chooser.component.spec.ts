import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceChooserComponent } from './workspace-chooser.component';

describe('WorkspaceChooserComponent', () => {
  let component: WorkspaceChooserComponent;
  let fixture: ComponentFixture<WorkspaceChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceChooserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
