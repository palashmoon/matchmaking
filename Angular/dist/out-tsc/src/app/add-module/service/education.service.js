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
import { throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Qualificationn } from '../education-dialog/domain/qualificationn';
import { Institute } from '../education-dialog/domain/institute';
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var EducationService = /** @class */ (function () {
    function EducationService(httpClient) {
        this.httpClient = httpClient;
        this.url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/education/';
    }
    EducationService.prototype.addEducationDetails = function (section) {
        return this.httpClient.post(this.url, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    EducationService.prototype.errorHandler = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
    EducationService.prototype.searchqualification = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisEducation/qualification/' + filter.name)
            .pipe(tap(function (response) {
            response.qualifications = response.qualifications
                .map(function (qualification) { return new Qualificationn(qualification.id, qualification.name); })
                .filter(function (qualification) { return qualification.name.includes(filter.name); });
            return response;
        }));
    };
    EducationService.prototype.searchinstitution = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisEducation/education/' + filter.name)
            .pipe(tap(function (response) {
            response.educations = response.educations
                .map(function (institute) { return new Institute(institute.id, institute.name); })
                .filter(function (institute) { return institute.name.includes(filter.name); });
            return response;
        }));
    };
    EducationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], EducationService);
    return EducationService;
}());
export { EducationService };
//# sourceMappingURL=education.service.js.map