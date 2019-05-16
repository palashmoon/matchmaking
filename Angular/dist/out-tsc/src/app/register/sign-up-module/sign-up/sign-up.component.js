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
import { RegisterModel } from 'src/app/register/models/register.model';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/register/services/register.service';
import { Router } from '@angular/router';
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(formBuilder, _registerService, router) {
        this.formBuilder = formBuilder;
        this._registerService = _registerService;
        this.router = router;
        this.user = new RegisterModel();
        this.hide = true;
        this.submitted = false;
        this.errorMsg = '';
    }
    SignUpComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            name: [this.user.name, [Validators.required]],
            email: [this.user.email, [Validators.required, Validators.email]],
            password: [
                this.user.password,
                [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
            ]
        });
    };
    SignUpComponent.prototype.onRegisterSubmit = function () {
        var _this = this;
        console.log(this.registerForm.value);
        this._registerService.submit(this.registerForm.value).subscribe(function (data) {
            _this.model = data;
            console.log(_this.model);
            _this.router.navigate([""]);
        });
    };
    SignUpComponent = __decorate([
        Component({
            selector: 'app-sign-up',
            templateUrl: './sign-up.component.html',
            styleUrls: ['./sign-up.component.css']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            RegisterService,
            Router])
    ], SignUpComponent);
    return SignUpComponent;
}());
export { SignUpComponent };
//# sourceMappingURL=sign-up.component.js.map