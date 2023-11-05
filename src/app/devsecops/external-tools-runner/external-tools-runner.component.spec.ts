import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalToolsRunnerComponent } from './external-tools-runner.component';

describe('ExternalToolsRunnerComponent', () => {
  let component: ExternalToolsRunnerComponent;
  let fixture: ComponentFixture<ExternalToolsRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalToolsRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalToolsRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
