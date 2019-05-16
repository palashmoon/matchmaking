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
var TOKEN_KEY = 'AuthToken';
var EMAIL_KEY = 'AuthEmail';
var ROLE_KEY = 'AuthRole';
var TokenStorageService = /** @class */ (function () {
    function TokenStorageService() {
    }
    TokenStorageService.prototype.signOut = function () {
        localStorage.clear();
    };
    TokenStorageService.prototype.saveToken = function (token) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);
    };
    TokenStorageService.prototype.getToken = function () {
        return localStorage.getItem(TOKEN_KEY);
    };
    TokenStorageService.prototype.saveEmail = function (email) {
        localStorage.removeItem(EMAIL_KEY);
        localStorage.setItem(EMAIL_KEY, email);
    };
    TokenStorageService.prototype.getEmail = function () {
        return localStorage.getItem(EMAIL_KEY);
    };
    TokenStorageService.prototype.saveRole = function (role) {
        localStorage.removeItem(ROLE_KEY);
        localStorage.setItem(ROLE_KEY, role);
    };
    TokenStorageService.prototype.getRole = function () {
        return localStorage.getItem(ROLE_KEY);
    };
    TokenStorageService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], TokenStorageService);
    return TokenStorageService;
}());
export { TokenStorageService };
//# sourceMappingURL=token-storage.service.js.map