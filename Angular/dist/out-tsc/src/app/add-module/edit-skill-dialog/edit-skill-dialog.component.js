var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { SkillComponent } from '../skill-dialog/skill.component';
import { DownstreamService } from '../service/downstream.service';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { SkillService } from '../service/skill.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
var EditSkillDialogComponent = /** @class */ (function (_super) {
    __extends(EditSkillDialogComponent, _super);
    function EditSkillDialogComponent(data, dialogRef, readfromjsonService, skillService, fb, token, downstream) {
        var _this = _super.call(this, data, dialogRef, readfromjsonService, skillService, fb, token) || this;
        _this.data = data;
        _this.dialogRef = dialogRef;
        _this.readfromjsonService = readfromjsonService;
        _this.skillService = skillService;
        _this.fb = fb;
        _this.token = token;
        _this.downstream = downstream;
        return _this;
    }
    EditSkillDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.downstream.subject.subscribe(function (data) { return _this.employeeData = data; });
        this.skillForm = this.fb.group({
            skills: this.fb.array([this.initItemRow()])
        });
        this.dataJson = this.readfromjsonService.readFromJson(this.json_url).subscribe(function (data) {
            _this.dataJson = data;
        });
    };
    EditSkillDialogComponent.prototype.initItemRow = function () {
        return this.fb.group({
            skillName: new FormControl(this.employeeData.skillName, Validators.required),
            skillLevel: new FormControl(this.employeeData.skillLevel, Validators.required)
        });
    };
    EditSkillDialogComponent = __decorate([
        Component({
            selector: 'app-edit-skill-dialog',
            templateUrl: './edit-skill-dialog.component.html',
            styleUrls: ['./edit-skill-dialog.component.css']
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Object, MatDialogRef, ReadfromjsonService,
            SkillService, FormBuilder,
            TokenStorageService, DownstreamService])
    ], EditSkillDialogComponent);
    return EditSkillDialogComponent;
}(SkillComponent));
export { EditSkillDialogComponent };
//# sourceMappingURL=edit-skill-dialog.component.js.map