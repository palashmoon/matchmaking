var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { TokenStorageService } from './login/service/token-storage.service';
import { Router } from '@angular/router';
var AppComponent = /** @class */ (function () {
    function AppComponent(tokenStorageService, router) {
        this.title = 'matchmaking';
        //   if (tokenStorageService.getToken()) {
        //     router.navigate(['home/user']);
        //   } else {
        //     router.navigate(['']);
        //   }
        // }
        if (tokenStorageService.getToken()) {
            if (tokenStorageService.getRole() === 'consumer') {
                router.navigate(['home/user']);
            }
            else if (tokenStorageService.getRole() === 'recruiter') {
                router.navigate(['/search']);
            }
        }
        else {
            router.navigate(['']);
        }
    }
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        }),
        __metadata("design:paramtypes", [TokenStorageService, Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map