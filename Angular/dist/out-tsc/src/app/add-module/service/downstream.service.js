var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { BehaviorSubject } from 'rxjs';
var DownstreamService = /** @class */ (function () {
    function DownstreamService(httpClient, token) {
        this.httpClient = httpClient;
        this.token = token;
        this.employeeId = this.token.getEmail();
        this.subject = new BehaviorSubject(this.employee);
        // const employeeId = this.token.getEmail();
        // const _url = 'https://matchmaker-zuul.stackroute.in/downstream-service/matchmaker/v1/employees' + '/' + employeeId;
        // this.employee = this.httpClient.get(_url).pipe(catchError(this.errorHandler));
    }
    DownstreamService.prototype.errorHandler = function (error) {
        return throwError(error.message);
    };
    DownstreamService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient, TokenStorageService])
    ], DownstreamService);
    return DownstreamService;
}());
export { DownstreamService };
//# sourceMappingURL=downstream.service.js.map