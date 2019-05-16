import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDashboardSmartComponent } from './employee-dashboard-smart.component';

describe('EmployeeDashboardSmartComponent', () => {
  let component: EmployeeDashboardSmartComponent;
  let fixture: ComponentFixture<EmployeeDashboardSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDashboardSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDashboardSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
