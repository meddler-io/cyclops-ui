import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsConfigComponent } from './tools-config.component';

describe('ToolsConfigComponent', () => {
  let component: ToolsConfigComponent;
  let fixture: ComponentFixture<ToolsConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
