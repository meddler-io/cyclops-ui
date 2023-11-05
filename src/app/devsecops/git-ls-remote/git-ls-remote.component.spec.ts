import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitLsRemoteComponent } from './git-ls-remote.component';

describe('GitLsRemoteComponent', () => {
  let component: GitLsRemoteComponent;
  let fixture: ComponentFixture<GitLsRemoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitLsRemoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GitLsRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
