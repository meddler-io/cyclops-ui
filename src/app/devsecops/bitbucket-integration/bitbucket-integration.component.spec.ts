import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitbucketIntegrationComponent } from './bitbucket-integration.component';

describe('BitbucketIntegrationComponent', () => {
  let component: BitbucketIntegrationComponent;
  let fixture: ComponentFixture<BitbucketIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitbucketIntegrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitbucketIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
