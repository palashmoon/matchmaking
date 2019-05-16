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
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { InterestsSection } from './domain/section';
import { Chicklets } from './domain/chicklets';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
var InterestDialogComponent = /** @class */ (function () {
    // constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    //   private dialogRef: MatDialogRef<InterestsDialogComponent>,
    //   private interestsService: InterestsService, private fb: FormBuilder) {
    // }
    function InterestDialogComponent(data, dialogRef, fb, token) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.token = token;
    }
    InterestDialogComponent.prototype.ngOnInit = function () {
        this.interestsForm = this.fb.group({
            interests: this.fb.array([this.initItemRow()])
        });
    };
    InterestDialogComponent.prototype.initItemRow = function () {
        return this.fb.group({
            interest: new FormControl('', Validators.required)
        });
    };
    InterestDialogComponent.prototype.addRow = function () {
        var control = this.interestsForm.controls['interests'];
        control.push(this.initItemRow());
    };
    InterestDialogComponent.prototype.deleteRow = function (index) {
        var control = this.interestsForm.controls['interests'];
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
    InterestDialogComponent.prototype.onSave = function () {
        var arr = this.interestsForm.get('interests');
        var chicklets = new Array();
        for (var i = 0; i < arr.length; i++) {
            var row = arr.at(i);
            var chicklet = new Chicklets(row.value.interest);
            chicklets.push(chicklet);
        }
        var section = new InterestsSection('Interests', this.token.getEmail(), 'add', chicklets);
        // this.interestsService.addInterestsDetails(section).subscribe(
        //   data => {
        //     this.output = data;
        //     console.log(this.output);
        //     this.dialogRef.close();
        //   },
        //   error => {
        //     this.errorMessage = error;
        //   }
        // );
    };
    InterestDialogComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    InterestDialogComponent = __decorate([
        Component({
            selector: 'app-interest-dialog',
            templateUrl: './interest-dialog.component.html',
            styleUrls: ['./interest-dialog.component.css']
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Object, MatDialogRef,
            FormBuilder,
            TokenStorageService])
    ], InterestDialogComponent);
    return InterestDialogComponent;
}());
export { InterestDialogComponent };
//# sourceMappingURL=interest-dialog.component.js.map