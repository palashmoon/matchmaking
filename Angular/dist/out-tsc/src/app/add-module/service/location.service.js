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
import { Currentcities } from '../location-dialog/domain/currentcities';
import { Pastcities } from '../location-dialog/domain/pastcities';
var httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
var LocationService = /** @class */ (function () {
    function LocationService(httpClient) {
        this.httpClient = httpClient;
        this.url = 'https://matchmaker-zuul.stackroute.in/upstream-service/api/v1/location';
    }
    LocationService.prototype.addLocationDetails = function (section) {
        console.log(section);
        return this.httpClient.post(this.url, section, httpOptions).pipe(catchError(this.errorHandler));
    };
    LocationService.prototype.errorHandler = function (error) {
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
    LocationService.prototype.searchcurrentcities = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisLocation/' + filter.name)
            .pipe(tap(function (response) {
            response.locations = response.locations
                .map(function (currentcities) { return new Currentcities(currentcities.name, currentcities.id); })
                .filter(function (currentcities) { return currentcities.name.includes(filter.name); });
            return response;
        }));
    };
    LocationService.prototype.searchpastcities = function (filter, page) {
        if (filter === void 0) { filter = { name: '' }; }
        if (page === void 0) { page = 1; }
        return this.httpClient.get('https://matchmaker-zuul.stackroute.in/cache-service/api/v1/redisLocation/' + filter.name)
            .pipe(tap(function (response) {
            response.locations = response.locations
                .map(function (pastcities) { return new Pastcities(pastcities.name, pastcities.id); })
                .filter(function (pastcities) { return pastcities.name.includes(filter.name); });
            return response;
        }));
    };
    LocationService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], LocationService);
    return LocationService;
}());
export { LocationService };
//# sourceMappingURL=location.service.js.map