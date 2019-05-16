import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatMenuModule, } from '@angular/material';
import { EmployeeDashboardDummyComponent } from './employee-dashboard-dummy.component';
describe('EmployeeDashboardDummyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [EmployeeDashboardDummyComponent],
            imports: [
                NoopAnimationsModule,
                LayoutModule,
                MatButtonModule,
                MatCardModule,
                MatGridListModule,
                MatIconModule,
                MatMenuModule,
            ]
        }).compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(EmployeeDashboardDummyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should compile', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=employee-dashboard-dummy.component.spec.js.map