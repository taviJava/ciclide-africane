import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpeciesComponent } from './search-species.component';

describe('SearchSpeciesComponent', () => {
  let component: SearchSpeciesComponent;
  let fixture: ComponentFixture<SearchSpeciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSpeciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
