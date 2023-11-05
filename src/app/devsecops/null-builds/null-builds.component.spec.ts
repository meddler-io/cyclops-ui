import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NullBuildsComponent } from './null-builds.component';

describe('NullBuildsComponent', () => {
  let component: NullBuildsComponent;
  let fixture: ComponentFixture<NullBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NullBuildsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NullBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
