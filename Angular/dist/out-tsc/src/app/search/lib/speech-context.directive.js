var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, HostBinding, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpeechService } from './speech.service';
var SpeechContextDirective = /** @class */ (function () {
    function SpeechContextDirective(speech) {
        this.speech = speech;
        this._destroyed = new Subject();
    }
    SpeechContextDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.speech.declareContext(this.ngSpeechContext);
        var localContext = this.ngSpeechContext.map(function (w) { return w.toLowerCase(); });
        this.speech.context.pipe(takeUntil(this._destroyed)).subscribe(function (context) {
            if (context === localContext.join('/')) {
                _this.speechClass = 'speech-active-context';
            }
            else if (context === localContext.slice(0, -1).join('/')) {
                _this.speechClass = 'speech-active-context-child';
            }
            else if (context.startsWith(localContext.join('/'))) {
                _this.speechClass = 'speech-active-context-ancestor';
            }
            else {
                _this.speechClass = '';
            }
        });
    };
    SpeechContextDirective.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SpeechContextDirective.prototype, "ngSpeechContext", void 0);
    __decorate([
        HostBinding('class'),
        __metadata("design:type", String)
    ], SpeechContextDirective.prototype, "speechClass", void 0);
    SpeechContextDirective = __decorate([
        Directive({
            selector: '[ngSpeechContext]'
        }),
        __metadata("design:paramtypes", [SpeechService])
    ], SpeechContextDirective);
    return SpeechContextDirective;
}());
export { SpeechContextDirective };
//# sourceMappingURL=speech-context.directive.js.map