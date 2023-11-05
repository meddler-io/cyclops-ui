import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDnsDiscoveredComponent } from './assets-dns-discovered.component';

describe('AssetsDnsDiscoveredComponent', () => {
  let component: AssetsDnsDiscoveredComponent;
  let fixture: ComponentFixture<AssetsDnsDiscoveredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsDnsDiscoveredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsDnsDiscoveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
