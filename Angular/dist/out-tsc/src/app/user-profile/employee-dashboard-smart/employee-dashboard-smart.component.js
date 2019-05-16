var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { DownstreamBackendService } from '../downstream-backend.service';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
var EmployeeDashboardSmartComponent = /** @class */ (function () {
    function EmployeeDashboardSmartComponent(downstreamService, route, token) {
        this.downstreamService = downstreamService;
        this.route = route;
        this.token = token;
        this.employeeEmit = new EventEmitter();
    }
    EmployeeDashboardSmartComponent.prototype.ngOnInit = function () {
        var _this = this;
        var employeeId = this.token.getEmail();
        // this.route.paramMap.subscribe(
        //   (params)=>{
        //    employeeId=params.get('id');
        //   }
        // );
        this.downstreamService.getEmployee(employeeId).subscribe(function (data) {
            _this.employee = data;
            console.log(_this.employee);
            _this.employeeEmit.emit(_this.employee);
        });
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], EmployeeDashboardSmartComponent.prototype, "employeeEmit", void 0);
    EmployeeDashboardSmartComponent = __decorate([
        Component({
            selector: 'app-employee-dashboard-smart',
            templateUrl: './employee-dashboard-smart.component.html',
            styleUrls: ['./employee-dashboard-smart.component.css']
        }),
        __metadata("design:paramtypes", [DownstreamBackendService,
            ActivatedRoute,
            TokenStorageService])
    ], EmployeeDashboardSmartComponent);
    return EmployeeDashboardSmartComponent;
}());
export { EmployeeDashboardSmartComponent };
//# sourceMappingURL=employee-dashboard-smart.component.js.map