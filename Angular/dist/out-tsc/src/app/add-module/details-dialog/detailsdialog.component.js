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
import { CertificatedialogComponent } from './../certificate-dialog/certificatedialog.component';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EducationdialogComponent } from '../education-dialog/educationdialog.component';
import { ExperienceComponent } from '../experience-dialog/experience.component';
import { SkillComponent } from '../skill-dialog/skill.component';
import { LocationdialogComponent } from '../location-dialog/locationdialog.component';
import { ProjectdialogComponent } from '../project-dialog/projectdialog.component';
import { InterestDialogComponent } from '../interest-dialog/interest-dialog.component';
var DetailsdialogComponent = /** @class */ (function () {
    function DetailsdialogComponent(data, dialogRef, dialog) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.dialog = dialog;
    }
    DetailsdialogComponent.prototype.ngOnInit = function () {
    };
    DetailsdialogComponent.prototype.close = function () {
        this.dialogRef.close();
    };
    DetailsdialogComponent.prototype.educationClick = function () {
        console.log('hey');
        this.dialogRef.close();
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        this.dialog.open(EducationdialogComponent, dialogConfig);
    };
    DetailsdialogComponent.prototype.experienceClick = function () {
        this.dialogRef.close();
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        this.dialog.open(ExperienceComponent, dialogConfig);
    };
    DetailsdialogComponent.prototype.interestClick = function () {
        this.dialogRef.close();
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        this.dialog.open(InterestDialogComponent, dialogConfig);
    };
    DetailsdialogComponent.prototype.skillClick = function () {
        this.dialogRef.close();
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        this.dialog.open(SkillComponent, dialogConfig);
    };
    DetailsdialogComponent.prototype.projectClick = function () {
        this.dialogRef.close();
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        this.dialog.open(ProjectdialogComponent, dialogConfig);
    };
    DetailsdialogComponent.prototype.certificateClick = function () {
        this.dialogRef.close();
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        this.dialog.open(CertificatedialogComponent, dialogConfig);
    };
    DetailsdialogComponent.prototype.locationClick = function () {
        this.dialogRef.close();
        var dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '40%';
        this.dialog.open(LocationdialogComponent, dialogConfig);
    };
    DetailsdialogComponent = __decorate([
        Component({
            selector: 'app-detailsdialog',
            templateUrl: './detailsdialog.component.html',
            styleUrls: ['./detailsdialog.component.css']
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Object, MatDialogRef,
            MatDialog])
    ], DetailsdialogComponent);
    return DetailsdialogComponent;
}());
export { DetailsdialogComponent };
//# sourceMappingURL=detailsdialog.component.js.map