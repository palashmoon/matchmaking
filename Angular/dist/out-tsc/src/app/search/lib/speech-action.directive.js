var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SpeechService } from './speech.service';
var SpeechActionDirective = /** @class */ (function () {
    function SpeechActionDirective(_view, speech) {
        this._view = _view;
        this.speech = speech;
        this.ngSpeechActionContext = [];
        this._destroyed = new Subject();
    }
    SpeechActionDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.speech.declareCommand(this.ngSpeechActionCommand, this.ngSpeechActionContext);
        this.speech.command.pipe(takeUntil(this._destroyed), filter(function (command) { return _this.match(command); })).subscribe(function (_command) {
            var component = _this._view.injector.view.component;
            _this.ngSpeechAction.bind(component)();
        });
    };
    SpeechActionDirective.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
    };
    SpeechActionDirective.prototype.match = function (command) {
        var context = this.ngSpeechActionContext.map(function (w) { return w.toLowerCase(); }).join('/');
        return command.context === context && command.command === this.ngSpeechActionCommand.toLowerCase();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SpeechActionDirective.prototype, "ngSpeechAction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SpeechActionDirective.prototype, "ngSpeechActionCommand", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SpeechActionDirective.prototype, "ngSpeechActionContext", void 0);
    SpeechActionDirective = __decorate([
        Directive({
            selector: '[ngSpeechAction]'
        }),
        __metadata("design:paramtypes", [ViewContainerRef,
            SpeechService])
    ], SpeechActionDirective);
    return SpeechActionDirective;
}());
export { SpeechActionDirective };
//# sourceMappingURL=speech-action.directive.js.map