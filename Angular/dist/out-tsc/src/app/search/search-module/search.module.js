var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MaterialModule } from 'src/app/login/login-module/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { SpeechModule } from '../lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
var SearchModule = /** @class */ (function () {
    function SearchModule() {
    }
    SearchModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                MaterialModule,
                BrowserModule,
                SpeechModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: 'SPEECH_LANG', useValue: 'en-US' }
            ],
            declarations: [SearchComponent]
        })
    ], SearchModule);
    return SearchModule;
}());
export { SearchModule };
//# sourceMappingURL=search.module.js.map