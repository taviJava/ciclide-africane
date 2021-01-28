import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmLinksComponent } from './adm-links.component';

describe('AdmLinksComponent', () => {
  let component: AdmLinksComponent;
  let fixture: ComponentFixture<AdmLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
