var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from 'src/app/routing/routing.module';
var SignUpModule = /** @class */ (function () {
    function SignUpModule() {
    }
    SignUpModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                MaterialModule,
                FormsModule,
                ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
                HttpClientModule,
                RoutingModule
            ],
            declarations: [SignUpComponent],
            exports: [SignUpComponent]
        })
    ], SignUpModule);
    return SignUpModule;
}());
export { SignUpModule };
//# sourceMappingURL=sign-up.module.js.map