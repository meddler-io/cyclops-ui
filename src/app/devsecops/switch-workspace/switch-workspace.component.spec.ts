import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchWorkspaceComponent } from './switch-workspace.component';

describe('SwitchWorkspaceComponent', () => {
  let component: SwitchWorkspaceComponent;
  let fixture: ComponentFixture<SwitchWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
