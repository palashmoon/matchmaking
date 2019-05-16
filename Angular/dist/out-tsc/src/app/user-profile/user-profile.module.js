var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDashboardDummyComponent } from './employee-dashboard-smart/employee-dashboard-dummy/employee-dashboard-dummy.component';
import { EmployeeDashboardSmartComponent } from './employee-dashboard-smart/employee-dashboard-smart.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardsModule } from '../add-module/cards.module';
import { MaterialModule } from '../login/login-module/material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
var UserProfileModule = /** @class */ (function () {
    function UserProfileModule() {
    }
    UserProfileModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                MatGridListModule,
                MatCardModule,
                MatIconModule,
                MatMenuModule,
                MatButtonModule,
                LayoutModule,
                CardsModule,
                MaterialModule,
                NgbModule,
                MatProgressBarModule
            ],
            declarations: [
                EmployeeDashboardDummyComponent,
                EmployeeDashboardSmartComponent,
            ]
        })
    ], UserProfileModule);
    return UserProfileModule;
}());
export { UserProfileModule };
//# sourceMappingURL=user-profile.module.js.map