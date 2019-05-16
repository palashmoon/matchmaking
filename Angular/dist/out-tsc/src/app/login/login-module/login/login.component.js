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
import { FormBuilder, Validators } from '@angular/forms';
import { AuthLoginInfo } from 'src/app/login/service/login-info';
import { AuthService } from 'src/app/login/service/auth.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { Router } from '@angular/router';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, authService, tokenStorageService, router) {
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.tokenStorageService = tokenStorageService;
        this.router = router;
        this.user = new AuthLoginInfo();
        this.hide = true;
        this.isLoggedIn = false;
        this.isLoginFailed = false;
        this.errorMessage = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            'email': [this.user.email, [
                    Validators.required,
                    Validators.email
                ]],
            'password': [this.user.password, [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(30)
                ]]
        });
        if (this.tokenStorageService.getToken()) {
            if (this.tokenStorageService.getRole() === 'consumer') {
                this.router.navigate(["/home/user"]);
            }
            else {
                this.router.navigate(["/search"]);
            }
        }
    };
    LoginComponent.prototype.onLoginSubmit = function () {
        var _this = this;
        console.log(this.loginForm.value);
        this.authService.submit(this.loginForm.value).subscribe(function (data) {
            if (data.token != null || data.token !== '') {
                _this.tokenStorageService.saveToken(data.token);
                _this.tokenStorageService.saveEmail(data.email);
                _this.tokenStorageService.saveRole(data.role);
                _this.isLoginFailed = false;
                _this.isLoggedIn = true;
                if (data.role === 'consumer') {
                    _this.router.navigate(["/home/user"]);
                }
                else {
                    _this.router.navigate(["/search"]);
                }
            }
        }, function (error) {
            console.log(error);
            _this.errorMessage = error.error.message;
            _this.isLoginFailed = true;
        });
    };
    LoginComponent.prototype.logout = function () {
        this.tokenStorageService.signOut();
    };
    LoginComponent.prototype.reloadPage = function () {
        window.location.reload();
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            AuthService,
            TokenStorageService,
            Router])
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map