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
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Domain } from '../project-dialog/domain/domain';
import { Organisation } from '../project-dialog/domain/organisation';
import { Client } from '../project-dialog/domain/client';
import { Tech } from '../project-dialog/domain/tech';
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var ProjectService = /** @class */ (function () {
    function ProjectService(httpClient) {
        this.httpClient = httpClient;
        this.url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/project';
    }
    ProjectService.prototype.addProjectDetails = function (section) {
        return this.httpClient.post(this.url, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    ProjectService.prototype.errorHandler = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return throwError('Something bad happened; please try again later.');
    };
    ProjectService.prototype.searchdomain = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisDomain/' + filter.name)
            .pipe(tap(function (response) {
            response.domains = response.domains
                .map(function (domain) { return new Domain(domain.name, domain.id); });
            return response;
        }));
    };
    ProjectService.prototype.searchcompany = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisOrganization/' + filter.name)
            .pipe(tap(function (response) {
            response.organizations = response.organizations
                .map(function (organisation) { return new Organisation(organisation.name, organisation.id); })
                .filter(function (organisation) { return organisation.name.includes(filter.name); });
            return response;
        }));
    };
    ProjectService.prototype.searchclient = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisOrganization/' + filter.name)
            .pipe(tap(function (response) {
            response.organizations = response.organizations
                .map(function (client) { return new Client(client.name, client.id); })
                .filter(function (client) { return client.name.includes(filter.name); });
            return response;
        }));
    };
    ProjectService.prototype.searchtech = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisSkill/' + filter.name)
            .pipe(tap(function (response) {
            response.skills = response.skills
                .map(function (tech) { return new Tech(tech.name, tech.id); });
            return response;
        }));
    };
    ProjectService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ProjectService);
    return ProjectService;
}());
export { ProjectService };
//# sourceMappingURL=project.service.js.map