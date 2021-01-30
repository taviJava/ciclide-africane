import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorsAdmAddComponent } from './distributors-adm-add.component';

describe('DistributorsAdmAddComponent', () => {
  let component: DistributorsAdmAddComponent;
  let fixture: ComponentFixture<DistributorsAdmAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorsAdmAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorsAdmAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
