import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmSpeciesListComponent } from './adm-species-list.component';

describe('AdmSpeciesListComponent', () => {
  let component: AdmSpeciesListComponent;
  let fixture: ComponentFixture<AdmSpeciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmSpeciesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmSpeciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
