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
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { SkillService } from '../service/skill.service';
import { SkillChicklets } from '../skill-dialog/domain/skillchicklets';
import { Skill } from '../skill-dialog/domain/skill';
import { SkillSection } from '../skill-dialog/domain/skillsection';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
var SkillComponent = /** @class */ (function () {
    function SkillComponent(data, dialogRef, readfromjsonService, skillService, fb, token) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.readfromjsonService = readfromjsonService;
        this.skillService = skillService;
        this.fb = fb;
        this.token = token;
        this.filteredSkills = [];
        this.isLoading = false;
        this.json_url = 'assets/skill.json';
        this.options = ['Beginner', 'Intermediate', 'Advance'];
    }
    SkillComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.skillForm = this.fb.group({
            skills: this.fb.array([this.initItemRow()])
        });
        this.dataJson = this.readfromjsonService.readFromJson(this.json_url).subscribe(function (data) {
            _this.dataJson = data;
        });
    };
    SkillComponent.prototype.onKeyUp = function (index) {
        var _this = this;
        this.temp = this.skillForm.get('skills');
        this.temp.at(index).get('skillName').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading = true; }), switchMap(function (value) {
            return _this.skillService.searchskills({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading = false; }));
        }))
            .subscribe(function (Iskills) { return _this.filteredSkills = Iskills.skills; });
    };
    SkillComponent.prototype.displayFn = function (skill) {
        if (skill) {
            return skill.name;
        }
    };
    SkillComponent.prototype.initItemRow = function () {
        return this.fb.group({
            skillName: new FormControl('', Validators.required),
            skillLevel: new FormControl('', Validators.required)
        });
    };
    SkillComponent.prototype.addRow = function () {
        var control = this.skillForm.controls['skills'];
        control.push(this.initItemRow());
    };
    SkillComponent.prototype.deleteRow = function (index) {
        var control = this.skillForm.controls['skills'];
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
    SkillComponent.prototype.onSave = function () {
        var _this = this;
        var arr = this.skillForm.get('skills');
        var chicklets = new Array();
        for (var i = 0; i < arr.length; i++) {
            var row = arr.at(i);
            var skill = new Skill('skillId', row.value.skillName.name, row.value.skillLevel);
            var chicklet = new SkillChicklets(skill);
            chicklets.push(chicklet);
        }
        // const section = new SkillSection("Skill", "userId", "add", chicklets);
        console.log('fjd ' + chicklets);
        var section = new SkillSection('Skill', this.token.getEmail(), 'add', chicklets);
        this.skillService.addSkillDetails(section).subscribe(function (data) {
            _this.output = data;
            _this.dialogRef.close();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    SkillComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    SkillComponent = __decorate([
        Component({
            selector: 'app-skill',
            templateUrl: './skill.component.html',
            styleUrls: ['./skill.component.css']
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Object, MatDialogRef, ReadfromjsonService,
            SkillService, FormBuilder,
            TokenStorageService])
    ], SkillComponent);
    return SkillComponent;
}());
export { SkillComponent };
//# sourceMappingURL=skill.component.js.map