import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsAdmListComponent } from './distributors-adm-list.component';

describe('DistributorsAdmListComponent', () => {
  let component: DistributorsAdmListComponent;
  let fixture: ComponentFixture<DistributorsAdmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorsAdmListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorsAdmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
