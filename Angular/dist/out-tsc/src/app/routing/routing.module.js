var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeDashboardDummyComponent } from '../user-profile/employee-dashboard-smart/employee-dashboard-dummy/employee-dashboard-dummy.component';
import { LoginComponent } from '../login/login-module/login/login.component';
import { SignUpComponent } from '../register/sign-up-module/sign-up/sign-up.component';
import { SearchComponent } from '../search/search-module/search/search.component';
export var appRoutes = [
    {
        path: 'home/:id',
        component: EmployeeDashboardDummyComponent
    }, {
        path: '',
        component: LoginComponent
    }, {
        path: 'search',
        component: SearchComponent
    }, {
        path: 'register',
        component: SignUpComponent
    }
];
var RoutingModule = /** @class */ (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(appRoutes, { enableTracing: true }),
                CommonModule
            ],
            declarations: [],
            exports: [RouterModule]
        })
    ], RoutingModule);
    return RoutingModule;
}());
export { RoutingModule };
//# sourceMappingURL=routing.module.js.map