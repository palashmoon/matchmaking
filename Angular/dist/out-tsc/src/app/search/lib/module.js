var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpeechService } from './speech.service';
import { SpeechActionDirective } from './speech-action.directive';
import { SpeechContextDirective } from './speech-context.directive';
var SpeechModule = /** @class */ (function () {
    function SpeechModule() {
    }
    SpeechModule = __decorate([
        NgModule({
            declarations: [
                SpeechActionDirective,
                SpeechContextDirective
            ],
            imports: [
                CommonModule
            ],
            providers: [SpeechService],
            exports: [
                SpeechActionDirective,
                SpeechContextDirective
            ]
        })
    ], SpeechModule);
    return SpeechModule;
}());
export { SpeechModule };
//# sourceMappingURL=module.js.map