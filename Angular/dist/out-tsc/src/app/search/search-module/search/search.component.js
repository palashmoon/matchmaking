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
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpeechService } from '../../lib';
import { SearchService } from '../../service/search.service';
import { QueryData } from '../../domain/QueryData';
var SearchComponent = /** @class */ (function () {
    function SearchComponent(tokenstorageservice, fb, searchService, speech) {
        this.tokenstorageservice = tokenstorageservice;
        this.fb = fb;
        this.searchService = searchService;
        this.speech = speech;
        this.errorMessage = '';
        this.isLoggedIn = false;
        this.msg = '';
        this.context = '';
        this.subscription = Subscription.EMPTY;
        this.started = false;
        this._destroyed = new Subject();
    }
    SearchComponent.prototype.createFormData = function () {
        return this.fb.group({
            query: ''
        });
    };
    SearchComponent.prototype.submitQuery = function () {
        var _this = this;
        var queryData = new QueryData(this.userId, this.queryForm.get('query').value, this.timeStamp);
        this.searchService.submitQueryDetails(queryData).subscribe(function (data) {
            // console.log(data);
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.tokenstorageservice.getToken()) {
            this.isLoggedIn = true;
        }
        this.queryForm = this.createFormData();
        this.speech.start();
        this.speech.message.pipe(takeUntil(this._destroyed)).subscribe(function (msg) { return _this.msg = msg.message; });
        this.speech.context.pipe(takeUntil(this._destroyed)).subscribe(function (context) { return _this.context = context; });
        this.good = { message: 'Try me!' };
        this.speech.started.pipe(takeUntil(this._destroyed)).subscribe(function (started) { return _this.started = started; });
    };
    SearchComponent.prototype.ngOnDestroy = function () {
        this._destroyed.next();
        this._destroyed.complete();
        this.subscription.unsubscribe();
    };
    SearchComponent.prototype.toggleVoiceRecognition = function () {
        if (this.started) {
            this.speech.stop();
        }
        else {
            this.speech.start();
        }
    };
    SearchComponent.prototype.logout = function () {
        this.tokenstorageservice.signOut();
        window.location.reload();
    };
    SearchComponent = __decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.component.html',
            styleUrls: ['./search.component.scss']
        }),
        __metadata("design:paramtypes", [TokenStorageService,
            FormBuilder,
            SearchService,
            SpeechService])
    ], SearchComponent);
    return SearchComponent;
}());
export { SearchComponent };
//# sourceMappingURL=search.component.js.map