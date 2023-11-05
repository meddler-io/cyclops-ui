import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsDnsComponent } from './assets-dns.component';

describe('AssetsDnsComponent', () => {
  let component: AssetsDnsComponent;
  let fixture: ComponentFixture<AssetsDnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetsDnsComponent ]
    })
    .compileComponents();
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsDnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
