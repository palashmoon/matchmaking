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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var DownstreamBackendService = /** @class */ (function () {
    function DownstreamBackendService(httpClient) {
        this.httpClient = httpClient;
        this._url = 'https://matchmaker-zuul.stackroute.in/downstream-service/matchmaker/v1/employees';
        this.delete_url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/education/';
        this.delete_url1 = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/skills/';
        this.delete_url2 = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/location/';
        this.delete_url3 = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/experience/';
        this.delete_url4 = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/project/';
        this.delete_url5 = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/certificate/';
    }
    DownstreamBackendService.prototype.getEmployee = function (employeeId) {
        var _url = this._url + '/' + employeeId;
        return this.httpClient.get(_url).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.errorHandler = function (error) {
        return throwError(error.message);
    };
    DownstreamBackendService.prototype.deleteEducationDetails = function (section) {
        console.log(section);
        return this.httpClient.post(this.delete_url, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.deleteSkillsDetails = function (section) {
        return this.httpClient.post(this.delete_url1, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.deleteExperienceDetails = function (section) {
        return this.httpClient.post(this.delete_url3, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.deleteLocationDetails = function (section) {
        return this.httpClient.post(this.delete_url2, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.deleteCerificateDetails = function (section) {
        return this.httpClient.post(this.delete_url5, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.deleteProjectDetails = function (section) {
        return this.httpClient.post(this.delete_url4, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.updateEducationDetails = function (section) {
        return this.httpClient.post(this.delete_url, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.updateSkillsDetails = function (section) {
        return this.httpClient.post(this.delete_url1, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.updateExperienceDetails = function (section) {
        return this.httpClient.post(this.delete_url3, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.updateLocationDetails = function (section) {
        return this.httpClient.post(this.delete_url2, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.updateCerificateDetails = function (section) {
        return this.httpClient.post(this.delete_url5, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService.prototype.updateProjectDetails = function (section) {
        return this.httpClient.post(this.delete_url4, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    DownstreamBackendService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], DownstreamBackendService);
    return DownstreamBackendService;
}());
export { DownstreamBackendService };
//# sourceMappingURL=downstream-backend.service.js.map