import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmGalleryComponent } from './adm-gallery.component';

describe('AdmGalleryComponent', () => {
  let component: AdmGalleryComponent;
  let fixture: ComponentFixture<AdmGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
