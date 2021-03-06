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
import { Certi } from '../certificate-dialog/domain/Certi';
import { Authority } from '../certificate-dialog/domain/Authority';
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var CertificateService = /** @class */ (function () {
    function CertificateService(httpClient) {
        this.httpClient = httpClient;
        this.url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/certificate';
    }
    CertificateService.prototype.addCertificateDetails = function (section) {
        return this.httpClient.post(this.url, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    CertificateService.prototype.errorHandler = function (error) {
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
    CertificateService.prototype.searchcertificate = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisCertification/' + filter.name)
            .pipe(tap(function (response) {
            response.certifications = response.certifications
                .map(function (certi) { return new Certi(certi.name, certi.id); });
            return response;
        }));
    };
    CertificateService.prototype.searchauthrity = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisOrganization/' + filter.name)
            .pipe(tap(function (response) {
            response.organizations = response.organizations
                .map(function (authority) { return new Authority(authority.name, authority.id); })
                .filter(function (authority) { return authority.name.includes(filter.name); });
            return response;
        }));
    };
    CertificateService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], CertificateService);
    return CertificateService;
}());
export { CertificateService };
//# sourceMappingURL=certificate.service.js.map