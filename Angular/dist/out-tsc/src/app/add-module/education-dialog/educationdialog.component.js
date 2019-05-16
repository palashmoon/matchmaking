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
import { ReadfromjsonService } from './../service/readfromjson.service';
import { Qualification } from '../education-dialog/domain/qualification';
import { Institution } from '../education-dialog/domain/institution';
import { EducationChicklets } from '../education-dialog/domain/educationchicklets';
import { EducationService } from 'src/app/add-module/service/education.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { EducationSection } from '../education-dialog/domain/educationsection';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
var EducationdialogComponent = /** @class */ (function () {
    function EducationdialogComponent(data, dialogRef, educationService, fb, readfromjsonService, token) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.educationService = educationService;
        this.fb = fb;
        this.readfromjsonService = readfromjsonService;
        this.token = token;
        this.filteredQualifications = [];
        this.filteredInstitutions = [];
        this.isLoading = false;
        this.isLoading1 = false;
        this.json_url = 'assets/education.json';
    }
    EducationdialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.educationForm = this.fb.group({
            education: this.fb.array([this.initItemRow()])
        });
        this.dataJson = this.readfromjsonService.readFromJson(this.json_url).subscribe(function (data) {
            _this.dataJson = data;
        });
    };
    EducationdialogComponent.prototype.onKeyUp = function (index) {
        var _this = this;
        this.temp = this.educationForm.get('education');
        this.temp.at(index).get('qualification').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading = true; }), switchMap(function (value) {
            return _this.educationService.searchqualification({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading = false; }));
        }))
            .subscribe(function (qualificationn) { return _this.filteredQualifications = qualificationn.qualifications; });
    };
    EducationdialogComponent.prototype.displayFn = function (qualification) {
        if (qualification) {
            return qualification.name;
        }
    };
    EducationdialogComponent.prototype.onKeyUp1 = function (index) {
        var _this = this;
        this.temp1 = this.educationForm.get('education');
        this.temp1.at(index).get('institute').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading1 = true; }), switchMap(function (value) {
            return _this.educationService.searchinstitution({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading1 = false; }));
        }))
            .subscribe(function (institutions) { return _this.filteredInstitutions = institutions.educations; });
    };
    EducationdialogComponent.prototype.displayFn1 = function (institute) {
        if (institute) {
            return institute.name;
        }
    };
    EducationdialogComponent.prototype.initItemRow = function () {
        return this.fb.group({
            qualification: new FormControl('', Validators.required),
            institute: new FormControl('', Validators.required),
            startDate: new FormControl('', Validators.required),
            endDate: new FormControl('', Validators.required)
        });
    };
    EducationdialogComponent.prototype.addRow = function () {
        var control = this.educationForm.controls['education'];
        control.push(this.initItemRow());
    };
    EducationdialogComponent.prototype.deleteRow = function (index) {
        var control = this.educationForm.controls['education'];
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
    EducationdialogComponent.prototype.onSave = function () {
        var _this = this;
        var arr = this.educationForm.get('education');
        var chicklets = new Array();
        for (var i = 0; i < arr.length; i++) {
            var row = arr.at(i);
            var temp = row.value.startDate;
            var qualification = new Qualification('qualificationId', row.value.qualification.name);
            var institution = new Institution('institutionId', row.value.institute.name, row.value.startDate.getDate() + '-' + (row.value.startDate.getMonth() + 1) + '-' + row.value.startDate.getFullYear(), row.value.endDate.getDate() + '-' + (row.value.endDate.getMonth() + 1) + '-' + row.value.endDate.getFullYear());
            var chicklet = new EducationChicklets(qualification, institution, this.summary);
            chicklets.push(chicklet);
        }
        var section = new EducationSection('Education', this.token.getEmail(), 'add', chicklets);
        this.educationService.addEducationDetails(section).subscribe(function (data) {
            _this.output = data;
            console.log(_this.output);
            _this.dialogRef.close();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    EducationdialogComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    EducationdialogComponent = __decorate([
        Component({
            selector: 'app-educationdialog',
            templateUrl: './educationdialog.component.html',
            styleUrls: ['./educationdialog.component.css'],
            providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
                { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Object, MatDialogRef,
            EducationService, FormBuilder,
            ReadfromjsonService,
            TokenStorageService])
    ], EducationdialogComponent);
    return EducationdialogComponent;
}());
export { EducationdialogComponent };
//# sourceMappingURL=educationdialog.component.js.map