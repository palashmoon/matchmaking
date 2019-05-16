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
import { ProjectService } from './../service/project.service';
import { ReadfromjsonService } from './../service/readfromjson.service';
import { Project } from './../project-dialog/domain/project';
import { Skill } from './../project-dialog/domain/skill';
import { ProjectChicklets } from './../project-dialog/domain/projectchicklets';
import { ProjectSection } from './../project-dialog/domain/projectsection';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/login/service/token-storage.service';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from '../class/date-adapter';
var ProjectdialogComponent = /** @class */ (function () {
    function ProjectdialogComponent(data, dialogRef, fb, projectService, readfromjsonService, token) {
        this.data = data;
        this.dialogRef = dialogRef;
        this.fb = fb;
        this.projectService = projectService;
        this.readfromjsonService = readfromjsonService;
        this.token = token;
        this.filteredDomains = [];
        this.filteredOrganisation = [];
        this.filteredClients = [];
        this.filteredTech = [];
        this.isLoading = false;
        this.isLoading1 = false;
        this.isLoading2 = false;
        this.isLoading3 = false;
        this.json_url = 'assets/project.json';
        this.options = ['Beginner', 'Intermediate', 'Advance'];
    }
    ProjectdialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        var regForUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
        this.projectForm = this.fb.group({
            title: ['', [Validators.required]],
            startDate: '',
            endDate: '',
            url: ['', [Validators.pattern(regForUrl)]],
            domain: '',
            role: '',
            company: '',
            client: '',
            technologiesUsed: this.fb.array([this.createTechnology()]),
            description: ''
        });
        this.dataJson = this.readfromjsonService.readFromJson(this.json_url).subscribe(function (data) {
            _this.dataJson = data;
        });
    };
    ProjectdialogComponent.prototype.onKeyUp = function (index) {
        var _this = this;
        this.projectForm.get('domain').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading = true; }), switchMap(function (value) {
            return _this.projectService.searchdomain({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading = false; }));
        }))
            .subscribe(function (response) { return _this.filteredDomains = response.domains; });
    };
    ProjectdialogComponent.prototype.displayFn = function (domain) {
        if (domain) {
            return domain.name;
        }
    };
    ProjectdialogComponent.prototype.onKeyUp1 = function (index) {
        var _this = this;
        this.projectForm.get('company').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading1 = true; }), switchMap(function (value) {
            return _this.projectService.searchcompany({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading1 = false; }));
        }))
            .subscribe(function (response) { return _this.filteredOrganisation = response.organizations; });
    };
    ProjectdialogComponent.prototype.displayFn1 = function (organisation) {
        if (organisation) {
            return organisation.name;
        }
    };
    ProjectdialogComponent.prototype.onKeyUp2 = function (index) {
        var _this = this;
        this.projectForm.get('client').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading2 = true; }), switchMap(function (value) {
            return _this.projectService.searchclient({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading2 = false; }));
        }))
            .subscribe(function (response) { return _this.filteredClients = response.organizations; });
    };
    ProjectdialogComponent.prototype.displayFn2 = function (client) {
        if (client) {
            return client.name;
        }
    };
    ProjectdialogComponent.prototype.onKeyUp3 = function (index) {
        var _this = this;
        this.temp = this.projectForm.get('technologiesUsed');
        this.temp.at(index).get('skill').valueChanges.pipe(debounceTime(300), tap(function () { return _this.isLoading3 = true; }), switchMap(function (value) {
            return _this.projectService.searchtech({ name: value }, 1)
                .pipe(finalize(function () { return _this.isLoading3 = false; }));
        }))
            .subscribe(function (techs) { return _this.filteredTech = techs.skills; });
    };
    ProjectdialogComponent.prototype.displayFn3 = function (tech) {
        if (tech) {
            return tech.name;
        }
    };
    ProjectdialogComponent.prototype.createTechnology = function () {
        return this.fb.group({
            skill: '',
            level: ''
        });
    };
    ProjectdialogComponent.prototype.addRow = function () {
        var control = this.projectForm.controls['technologiesUsed'];
        control.push(this.createTechnology());
    };
    ProjectdialogComponent.prototype.deleteRow = function (i) {
        var control = this.projectForm.controls['technologiesUsed'];
        if (control != null) {
            this.totalRow = control.value.length;
        }
        if (this.totalRow > 1) {
            control.removeAt(i);
        }
        else {
            alert('Add atleast one technology.');
            return false;
        }
    };
    ProjectdialogComponent.prototype.onSave = function () {
        var _this = this;
        this.title = this.projectForm.get('title').value;
        this.startDate = this.projectForm.get('startDate').value;
        this.endDate = this.projectForm.get('endDate').value;
        this.url = this.projectForm.get('url').value;
        this.domain = this.projectForm.get('domain').value.name;
        this.role = this.projectForm.get('role').value;
        this.company = this.projectForm.get('company').value.name;
        this.client = this.projectForm.get('client').value.name;
        this.description = this.projectForm.get('description').value;
        var technologies = new Array();
        var arr = this.projectForm.get('technologiesUsed');
        var values = arr.value;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var row = values_1[_i];
            var technology = new Skill(row.skill.name, row.level);
            technologies.push(technology);
        }
        var project = new Project(this.title, this.startDate.getDate() + "-" + (this.startDate.getMonth() + 1) + "-" + this.startDate.getFullYear(), this.endDate.getDate() + "-" + (this.endDate.getMonth() + 1) + "-" + this.endDate.getFullYear(), this.url, this.domain, this.role, this.company, this.client, technologies, this.description);
        var chicklets = new Array();
        var chicklet = new ProjectChicklets(project);
        chicklets.push(chicklet);
        var section = new ProjectSection('sectionId', this.token.getEmail(), 'add', chicklets);
        console.log(section);
        this.projectService.addProjectDetails(section).subscribe(function (data) {
            _this.dialogRef.close();
        }, function (error) {
            _this.errorMessage = error;
        });
    };
    ProjectdialogComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    ProjectdialogComponent = __decorate([
        Component({
            selector: 'app-projectdialog',
            templateUrl: './projectdialog.component.html',
            styleUrls: ['./projectdialog.component.css'],
            providers: [{ provide: DateAdapter, useClass: AppDateAdapter },
                { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }]
        }),
        __param(0, Inject(MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [Object, MatDialogRef,
            FormBuilder, ProjectService,
            ReadfromjsonService,
            TokenStorageService])
    ], ProjectdialogComponent);
    return ProjectdialogComponent;
}());
export { ProjectdialogComponent };
//# sourceMappingURL=projectdialog.component.js.map