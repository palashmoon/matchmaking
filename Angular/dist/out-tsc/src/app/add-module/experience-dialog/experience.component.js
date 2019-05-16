var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, Inject } from '@angular/core';
import { ExperienceService } from 'src/app/add-module/service/experience.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ExperienceSection } from '../experience-dialog/domain/section';
import { Chicklets } from '../experience-dialog/domain/chicklets';
import { ExperienceDetails } from '../experience-dialog/domain/experience-details';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
var ExperienceComponent = /** @class */ (function () {
    function ExperienceComponent(data, dialogRef, experienceService, fb, token) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.experienceService = experienceService;
        this.fb = fb;
        this.token = token;
        this.filteredOrganisations = [];
        this.isLoading = false;
    }
    ExperienceComponent.prototype.ngOnInit = function () {
        this.experienceForm = this.fb.group({
            experience: this.fb.array([this.initItemRow()])
        });
    };
    ExperienceComponent.prototype.onKeyUp = function (index) {
        var _this = this;
        this.temp = this.experienceForm.get('experience');
        this.temp.at(index).get('organisation').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading = true; }), switchMap(function (value) {
            return _this.experienceService.search({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading = false; }));
        }))
            .subscribe(function (response) { return _this.filteredOrganisations = response.organizations; });
    };
    ExperienceComponent.prototype.displayFn = function (organisation) {
        if (organisation) {
            return organisation.name;
        }
    };
    ExperienceComponent.prototype.initItemRow = function () {
        return this.fb.group({
            organisation: new FormControl('', Validators.required),
            role: new FormControl('', Validators.required),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl('', Validators.required)
        });
    };
    ExperienceComponent.prototype.addRow = function () {
        var control = this.experienceForm.controls['experience'];
        control.push(this.initItemRow());
    };
    ExperienceComponent.prototype.deleteRow = function (index) {
        var control = this.experienceForm.controls['experience'];
        if (control != null) {
            this.totalRow = control.value.length;
        }
        if (this.totalRow > 1) {
            control.removeAt(index);
        }
        else {
            alert('Add one more details.');
            return false;
        }
    };
    ExperienceComponent.prototype.onSave = function () {
        var _this = this;
        var arr = this.experienceForm.get('experience');
        var chicklets = new Array();
        for (var i = 0; i < arr.length; i++) {
            var row = arr.at(i);
            var fromDate = void 0;
            fromDate = row.value.startDate;
            console.log(fromDate);
            this.fromDay = fromDate.getDate();
            this.fromYear = fromDate.getFullYear();
            this.fromMonth = fromDate.getMonth() + 1;
            var toDate = void 0;
            toDate = row.value.endDate;
            console.log(fromDate);
            this.toDay = toDate.getDate();
            this.toYear = toDate.getFullYear();
            this.toMonth = toDate.getMonth() + 1;
            var experienceDetails = new ExperienceDetails(row.value.organisation.name, row.value.role, this.fromDay, this.fromMonth, this.fromYear, this.toDay, this.toMonth, this.toYear);
            var chicklet = new Chicklets(experienceDetails);
            chicklets.push(chicklet);
        }
        var section = new ExperienceSection('Experience', this.token.getEmail(), 'add', chicklets);
        this.experienceService.addExperienceDetails(section).subscribe(function (data) {
            _this.output = data;
            console.log(_this.output);
            _this.dialogRef.close();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ExperienceComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    ExperienceComponent = __decorate([
        Component({
            selector: 'app-experience',
            templateUrl: './experience.component.html',
            styleUrls: ['./experience.component.css'],
            providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
                { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Object, MatDialogRef,
            ExperienceService, FormBuilder,
            TokenStorageService])
    ], ExperienceComponent);
    return ExperienceComponent;
}());
export { ExperienceComponent };
//# sourceMappingURL=experience.component.js.map