import { async, TestBed } from '@angular/core/testing';
import { EmployeeDashboardSmartComponent } from './employee-dashboard-smart.component';
describe('EmployeeDashboardSmartComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EmployeeDashboardSmartComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EmployeeDashboardSmartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=employee-dashboard-smart.component.spec.js.map