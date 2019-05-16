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
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Certificate } from '../certificate-dialog/domain/certificate';
import { CertificateChicklets } from '../certificate-dialog/domain/certificatechicklets';
import { CertificateSection } from '../certificate-dialog/domain/certificatesection';
import { CertificateService } from '../service/certificate.service';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
var CertificatedialogComponent = /** @class */ (function () {
    function CertificatedialogComponent(data, certificateService, readfromjsonService, dialogRef, fb, token) {
        this.data = data;
        this.certificateService = certificateService;
        this.readfromjsonService = readfromjsonService;
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.token = token;
        this.filteredCertificates = [];
        this.filteredAuthorities = [];
        this.isLoading = false;
        this.json_url = 'assets/certificate.json';
    }
    CertificatedialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.certificateForm = this.fb.group({
            certificate: this.fb.array([this.initItemRow()])
        });
        this.dataJson = this.readfromjsonService.readFromJson(this.json_url).subscribe(function (data) {
            _this.dataJson = data;
        });
    };
    CertificatedialogComponent.prototype.onKeyUp = function (index) {
        var _this = this;
        this.temp = this.certificateForm.get('certificate');
        this.temp.at(index).get('certificateName').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading = true; }), switchMap(function (value) {
            return _this.certificateService.searchcertificate({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading = false; }));
        }))
            .subscribe(function (response) { return _this.filteredCertificates = response.certifications; });
    };
    CertificatedialogComponent.prototype.displayFn = function (certi) {
        if (certi) {
            return certi.name;
        }
    };
    CertificatedialogComponent.prototype.onKeyUp1 = function (index) {
        var _this = this;
        this.temp = this.certificateForm.get('certificate');
        this.temp.at(index).get('certificateAuthority').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading = true; }), switchMap(function (value) {
            return _this.certificateService.searchauthrity({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading = false; }));
        }))
            .subscribe(function (response) { return _this.filteredAuthorities = response.organizations; });
    };
    CertificatedialogComponent.prototype.displayFn1 = function (authority) {
        if (authority) {
            return authority.name;
        }
    };
    CertificatedialogComponent.prototype.initItemRow = function () {
        return this.fb.group({
            certificateName: new FormControl('', Validators.required),
            certificateAuthority: new FormControl('', Validators.required),
            licenseNumber: new FormControl('', Validators.required),
            fromDate: new FormControl('', Validators.required),
            toDate: new FormControl('', Validators.required)
        });
    };
    CertificatedialogComponent.prototype.addRow = function () {
        var control = this.certificateForm.controls['certificate'];
        control.push(this.initItemRow());
    };
    CertificatedialogComponent.prototype.deleteRow = function (index) {
        var control = this.certificateForm.controls['certificate'];
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
    CertificatedialogComponent.prototype.onSave = function () {
        var _this = this;
        var arr = this.certificateForm.get('certificate');
        var chicklets = new Array();
        for (var i = 0; i < arr.length; i++) {
            var row = arr.at(i);
            var certificateDetails = new Certificate(row.value.certificateName, row.value.certificateAuthority.name, row.value.licenseNumber, row.value.fromDate.getDate() + "-" + (row.value.fromDate.getMonth() + 1) + "-" + row.value.fromDate.getFullYear(), row.value.toDate.getDate() + "-" + (row.value.toDate.getMonth() + 1) + "-" + row.value.toDate.getFullYear());
            var chicklet = new CertificateChicklets(certificateDetails);
            chicklets.push(chicklet);
        }
        var section = new CertificateSection('Certificate', this.token.getEmail(), 'add', chicklets);
        this.certificateService.addCertificateDetails(section).subscribe(function (data) {
            _this.dialogRef.close();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    CertificatedialogComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    CertificatedialogComponent = __decorate([
        Component({
            selector: 'app-certificatedialog',
            templateUrl: './certificatedialog.component.html',
            styleUrls: ['./certificatedialog.component.css'],
            providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
                { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Object, CertificateService, ReadfromjsonService,
            MatDialogRef,
            FormBuilder,
            TokenStorageService])
    ], CertificatedialogComponent);
    return CertificatedialogComponent;
}());
export { CertificatedialogComponent };
//# sourceMappingURL=certificatedialog.component.js.map